using System.Linq;
using backend.Models;
using System;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using System.Security.Claims;
using Microsoft.Extensions.Configuration;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using static backend.Installer.JWTInstaller;
using backend.Data;

namespace backend.Services
{
    
 public class AuthRepository : IAuthRepository
    {
        private readonly DataContext _context;
        private readonly JwtSettings jwtSettings;

        public AuthRepository(DataContext context, JwtSettings jwtSettings)
        {
            this.jwtSettings = jwtSettings;
            _context = context;
        }

        public void Register(Users user)
        {
            user.Password = CreatePasswordHash(user.Password);
            _context.Users.Add(user);
            _context.SaveChanges();
        }

        public (Users, string) Login(Users users)
        {
            var result = _context.Users.SingleOrDefault(u => u.Username == users.Username);
            var token = String.Empty;
            if (result != null && VerifyPassword(result.Password, users.Password))
            {
                token = BuildToken(result);
            }
            return (result, token);
        }

        private string CreatePasswordHash(string password)
        {
            byte[] salt = new byte[128 / 8];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(salt);
            }
            string hashed = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                password: password,
                salt: salt,
                prf: KeyDerivationPrf.HMACSHA512,
                iterationCount: 10000,
                numBytesRequested: 256 / 8));
            return $"{Convert.ToBase64String(salt)}.{hashed}";
        }

        public bool VerifyPassword(string hash, string password)
        {
            var parts = hash.Split('.', 2);

            if (parts.Length != 2)
            {
                return false;
            }

            var salt = Convert.FromBase64String(parts[0]);
            var passwordHash = parts[1];

            string hashed = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                password: password,
                salt: salt,
                prf: KeyDerivationPrf.HMACSHA512,
                iterationCount: 10000,
                numBytesRequested: 256 / 8));

            return passwordHash == hashed;
        }

        private string BuildToken(Users user)
        {
            // key is case-sensitive
            var claims = new[] {
                new Claim(JwtRegisteredClaimNames.Sub, "For Testing"),
                new Claim("id", user.Id.ToString()),
                new Claim("username", user.Username),
                new Claim(ClaimTypes.Role, user.Position)
            };

            var expires = DateTime.Now.AddDays(Convert.ToDouble(jwtSettings.Expire));
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings.Key));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: jwtSettings.Issuer,
                audience: jwtSettings.Audience,
                claims: claims,
                expires: expires,
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}