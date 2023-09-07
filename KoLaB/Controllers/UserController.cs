using KoLaB.Context;
using KoLaB.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace KoLaB.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly AppDBContext _authContext;
        public UserController(AppDBContext appDBContext)
        {
            _authContext = appDBContext;
        }

       
    }
}
