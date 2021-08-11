using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WhaleSpotting.Services;
using WhaleSpotting.Models.RequestModels;
using WhaleSpotting.Models.ResponseModels;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using WhaleSpotting.Constants;
using WhaleSpotting.Models.Enums;
using WhaleSpotting.Filters;
using Microsoft.AspNetCore.Identity;
using WhaleSpotting.Models.DbModels;

namespace WhaleSpotting.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class SightingsController : ControllerBase
    {
        private readonly ISightingsService _sightings;
        private readonly UserManager<UserDbModel> _userManager;

        public SightingsController(ISightingsService sightings, UserManager<UserDbModel> userManager)
        {
            _sightings = sightings;
            _userManager = userManager;
        }

        [HttpGet]
        public async Task<List<SightingResponseModel>> GetAllSightings()
        {
            return await _sightings.GetAllSightings();
        }

        [HttpGet("search")]
        public async Task<ActionResult<List<SightingResponseModel>>> SearchSighting([FromQuery] SearchSightingRequestModel searchSighting, PageFilter pageFilter)
        {
            var result = await _sightings.SearchSighting(searchSighting, pageFilter);
            return result.Any() ? result : NotFound();
        }

        [Authorize]
        [HttpPost("create")]
        public async Task<IActionResult> CreateSighting([FromBody] SightingRequestModel sightingRequestModel)
        {
            var currentUser = await _userManager.GetUserAsync(User);
            try
            {
                var newSighting = _sightings.CreateSighting(sightingRequestModel, currentUser);
                return Created($"api/sighting/{newSighting.Id}", newSighting);
            }
            catch (Exception e)
            {
                ModelState.AddModelError(nameof(SightingRequestModel.SightedAt), e.Message);
                return ValidationProblem();
            }
        }

        [Authorize(Roles = AuthConstants.Admin)]
        [HttpGet("pending")]
        public async Task<List<SightingResponseModel>> GetNotConfirmedSightings([FromQuery] PageFilter pageFilter)
        {
            return await _sightings.GetNotConfirmedSightings(pageFilter);
        }

        [Authorize(Roles = AuthConstants.Admin)]
        [HttpPut("{id}/confirm")]
        public async Task<ActionResult<SightingResponseModel>> ConfirmSighting([FromRoute] int id)
        {
            var sighting = await _sightings.ConfirmSighting(id);
            return sighting == null ? NotFound() : sighting;
        }

        [Authorize(Roles = AuthConstants.Admin)]
        [HttpDelete("{id}/reject")]
        public async Task<ActionResult<SightingResponseModel>> DeleteSighting([FromRoute] int id)
        {
            var sighting = await _sightings.DeleteSighting(id);
            return sighting == null ? NotFound() : sighting;
        }

        [HttpGet("localspecies")]
        public async Task<IEnumerable<Species?>> GetSpeciesByCoordinates([FromQuery] double latitude, double longitude)
        {
            return await _sightings.GetSpeciesByCoordinates(latitude, longitude);
        }

        [Authorize]
        [HttpGet("current")]
        public async Task<List<SightingResponseModel>> GetCurrentUserSightings([FromQuery] PageFilter pageFilter)
        {
            var currentUser = await _userManager.GetUserAsync(User);
            return await _sightings.GetUserSightings(currentUser, pageFilter);
        }
    }
}