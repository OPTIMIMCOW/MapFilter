using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WhaleSpotting.Services;
using WhaleSpotting.Models.RequestModels;
using WhaleSpotting.Models.ResponseModels;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Options;

namespace WhaleSpotting.Controllers
{
    [ApiController]
    [Route("[controller]")]
    //[ValidateModel]
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
        public IActionResult CreateSighting([FromBody] SightingRequestModel sightingRequestModel, [FromServices] IOptions<ApiBehaviorOptions> apiBehaviorOptions)
        {
            if (sightingRequestModel.SightedAt > DateTime.Now)
            {
                ModelState.AddModelError(nameof(sightingRequestModel.SightedAt), "Date of sighting must be in the past");
                return apiBehaviorOptions.Value.InvalidModelStateResponseFactory(ControllerContext);
            }

            try
            {
                var newSighting =_sightings.CreateSighting(sightingRequestModel);
                return Created($"/sighting/{newSighting.Id}", newSighting);
                // TODO note the url parameter above is to be updated if a get sighting by id endpoint is created. 
            }
            catch (Exception e)
            {
                ModelState.AddModelError("errors", e.Message);
                return apiBehaviorOptions.Value.InvalidModelStateResponseFactory(ControllerContext);
            }
        }
    }


}