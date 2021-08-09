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

namespace WhaleSpotting.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SightingsController : ControllerBase
    {
        private readonly ISightingsService _sightings;

        public SightingsController(ISightingsService sightings)
        {
            _sightings = sightings;
        }

        [HttpGet]
        public async Task<List<SightingResponseModel>> GetAllSightings([FromQuery] PageFilter pageFilter)
        {
            return await _sightings.GetSightings(pageFilter);
        }

        [Authorize]
        [HttpGet("/search")]
        public async Task<ActionResult<List<SightingResponseModel>>> SearchSighting([FromQuery] SearchSightingRequestModel searchSighting, PageFilter pageFilter)
        {
            var result = await _sightings.SearchSighting(searchSighting, pageFilter);
            return result.Any() ? result: NotFound();
        }

        [Authorize]
        [HttpPost("create")]
        public IActionResult CreateSighting([FromBody] SightingRequestModel sightingRequestModel)
        {
            try
            {
                var newSighting = _sightings.CreateSighting(sightingRequestModel);
                return Created($"/sighting/{newSighting.Id}", newSighting);
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

        [Authorize(Roles = AuthConstants.Admin )]
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
    }
}