using backend.Models;

namespace backend.Services
{
    public interface IAuthRepository
    {
         void Register(Users user);
         (Users, string) Login(Users user);
    }
}