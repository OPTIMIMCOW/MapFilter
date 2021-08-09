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
        public async Task<List<SightingResponseModel>> GetAllSightings()
        {
            return await _sightings.GetSightings();
        }

        [Authorize]
        [HttpGet("/search")]
        public async Task<ActionResult<List<SightingResponseModel>>> SearchSighting([FromQuery] SearchSightingRequestModel searchSighting)
        {
            var result = await _sightings.SearchSighting(searchSighting);
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

        [Authorize(Roles = AuthConstants.Admin )]
        [HttpPut("{id}/confirm")]
        public async Task<ActionResult<SightingResponseModel>> ConfirmSighting([FromRoute] int id)
        {
            var sighting = await _sightings.ConfirmSighting(id);
            return sighting == null ? NotFound() : sighting;
        }

        //TODO add admin role
        [Authorize]
        [HttpGet("pending")]
        public async Task<List<SightingResponseModel>> GetNotConfirmedSightings()
        {
            return await _sightings.GetNotConfirmedSightings();
        }

        //TODO use admin role
        [Authorize]
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