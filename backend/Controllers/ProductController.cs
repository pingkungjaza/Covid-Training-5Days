using System;
using System.Linq;
using backend.Data;
using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace backend.Controllers
{
    //../api/product
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class ProductController : ControllerBase
    {

        ILogger<ProductController> _logger;
        private readonly IProductRepository productRepository;

        public ProductController(ILogger<ProductController> logger, IProductRepository productRepository)
        {
            this.productRepository = productRepository;
            _logger = logger;
        }

        [HttpGet]
        public IActionResult GetProducts()
        {
            try //http status code
            {
                return Ok(productRepository.GetProducts()); //status 200 for standard
            }
            catch (Exception error)
            {
                _logger.LogError("Failed to execute GET");
                return StatusCode(500, new { message = error }); //400 server not connect 500
            }
        }

        [HttpGet("{id}")]
        public IActionResult GetProductsById(int id)
        {
            try //http status code
            {
                var result = productRepository.GetProduct(id);
                if (result == null)
                {
                    return NotFound(new { message = "Product not found" });
                }
                return Ok(result);
                //status 200 for standard
            }
            catch (Exception error)
            {
                _logger.LogError("Failed to execute GET");
                return StatusCode(500, new { message = error }); //400 server not connect 500
            }
        }

        [HttpPost]
        public IActionResult Post([FromForm] Products product, IFormFile file)
        {
            try
            {
                productRepository.AddProduct(product, file);
                return Created("", null);
            }
            catch (Exception error)
            {
                _logger.LogError("Failed to execute POST");
                return StatusCode(500, new { message = error }); //400 server not connect 500
            }
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id,[FromForm] Products product, IFormFile file)
        {
            try
            {
                var result = productRepository.GetProduct(id);
                if (result == null)
                {
                    return NotFound(new { message = "Product not found" });
                }

                result.Name = product.Name;
                result.Price = product.Price;
                result.Stock = product.Stock;

                productRepository.EditProduct(result, file);
                return Ok(result);
            }
            catch (Exception error)
            {
                _logger.LogError("Failed to execute PUT");
                return StatusCode(500, new { message = error }); //400 server not connect 500
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                var result = productRepository.GetProduct(id);
                if (result == null)
                {
                    return NotFound(new { message = "Product not found" });
                }

                productRepository.DeleteProduct(result);
                return NoContent(); // 204 no content
            }
            catch (Exception error)
            {
                _logger.LogError("Failed to execute DELETE");
                return StatusCode(500, new { message = error }); //400 server not connect 500
            }
        }
        
        [AllowAnonymous]
        [HttpGet("images/{name}")]
        public IActionResult ProductImage(string name)
        {
            return File($"~/images/{name}", "image/jpg");
        }
    }
}