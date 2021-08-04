using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WhaleSpotting.Services;
using WhaleSpotting.Models.RequestModels;
using WhaleSpotting.Models.ResponseModels;
using Microsoft.AspNetCore.Mvc.ModelBinding;

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
        public async Task<List<SightingResponseModel>> GetInfo()
        {
            return await _sightings.GetSightings();
        }

        [HttpPost("/create")]
        public IActionResult CreateSighting([FromBody] SightingRequestModel sightingRequestModel)
        {
            try
            {
                var newSighting =_sightings.CreateSighting(sightingRequestModel);
                return Created($"/sighting/{newSighting.Id}", newSighting);
                // TODO note the url parameter above is to be updated if a get sighting by id endpoint is created. 
            }
            catch (Exception e)
            {
                var modelState = new ModelStateDictionary();
                modelState.AddModelError("errors", e.Message);
                return BadRequest(modelState);
            }
        }
    }
}