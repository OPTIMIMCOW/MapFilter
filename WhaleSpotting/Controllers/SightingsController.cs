using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WhaleSpotting.Models.ApiModels;
using WhaleSpotting.Services;
using WhaleSpotting.Models.RequestModels;

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

        [HttpPost]
        public string CreateSighting([FromBody] SightingRequestModel sightingRequestModel)
        {
            try
            {
                _sightings.CreateSighting(sightingRequestModel);
                return "Success";
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
            Created()
           
        }
    }
}