using KoLaB.Context;
using KoLaB.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace KoLaB.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BaseController : ControllerBase
    {
        private readonly AppDBContext _authContext;
     
        public BaseController(AppDBContext context)
        {
            _authContext = context;
          
        }
        [Authorize]
        [HttpGet]
        public async Task<ActionResult<User>> GetAllUser()
        {
            return Ok(await _authContext.Users.ToListAsync());
        }
    }
}
