using System.Collections.Generic;
using backend.Models;
using Microsoft.AspNetCore.Http;

namespace backend.Services
{
    public interface IProductRepository
    {
        IEnumerable<Products> GetProducts();
        Products GetProduct(int id);
        void AddProduct(Products product, IFormFile image);
        void EditProduct(Products product, IFormFile image);
        void DeleteProduct(Products product);
    }
}