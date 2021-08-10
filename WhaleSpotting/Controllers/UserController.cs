using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Threading.Tasks;
using WhaleSpotting.Constants;
using WhaleSpotting.Models.DbModels;

namespace WhaleSpotting.Controllers
{
    [Authorize]
    [ApiController]
    [Route("/api/[controller]/[action]")]
    public class UserController : ControllerBase
    {
        private readonly SignInManager<UserDbModel> _signInManager;
        private readonly UserManager<UserDbModel> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;

        public UserController(RoleManager<IdentityRole> roleManager, SignInManager<UserDbModel> signInManager, UserManager<UserDbModel> userManager)
        {
            _roleManager = roleManager;
            _signInManager = signInManager;
            _userManager = userManager;
        }
        
        //[Authorize]
        //[HttpGet]
        //public async Task<UserDbModel> GetCurrentUser()
        //{
        //    return await _userManager.GetUserAsync(User);
        //}
        
        [HttpGet]
        public async Task<IActionResult> MakeAdmin()
        {
            var currentUser = await _userManager.GetUserAsync(User);
            var roles = await _userManager.GetRolesAsync(currentUser);
            if (roles.Any())
            {
                return Ok();
            }
            await _roleManager.CreateAsync(new IdentityRole(AuthConstants.Admin));
            await _userManager.AddToRoleAsync(currentUser, AuthConstants.Admin);
            await _signInManager.RefreshSignInAsync(currentUser);
            return Ok();
        }

        [HttpGet]
        public async Task<IActionResult> RemoveAdmin()
        {
            var currentUser = await _userManager.GetUserAsync(User);
            var roles = await _userManager.GetRolesAsync(currentUser);
            await _userManager.RemoveFromRolesAsync(currentUser, roles);
            await _signInManager.RefreshSignInAsync(currentUser);
            return Ok();
        }

        [Authorize(Roles = AuthConstants.Admin)]
        [HttpGet]
        public IActionResult CheckAdmin()
        {
            return Ok();
        }
    }
}