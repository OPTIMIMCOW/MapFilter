﻿using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WhaleSpotting.Services;
using WhaleSpotting.Models.RequestModels;
using WhaleSpotting.Models.ResponseModels;
using Microsoft.AspNetCore.Authorization;

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

        [HttpPost("create")]
        public IActionResult CreateSighting([FromBody] SightingRequestModel sightingRequestModel)
        {
            try
            {
                var newSighting = _sightings.CreateSighting(sightingRequestModel);
                return Created($"/sighting/{newSighting.Id}", newSighting);
                // TODO note the url parameter above is to be updated if a get sighting by id endpoint is created. 
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Authorize]
        [HttpPut("{id}/confirm")]
        public async Task<ActionResult<SightingResponseModel>> ConfirmSighting([FromRoute] int id)
        {
            var sighting = await _sightings.ConfirmSighting(id);
            return sighting == null ? NotFound() : sighting;
        }

        [HttpGet("localspecies")]
        public async Task<IEnumerable<string>> GetSpeciesByCoordinates([FromQuery] string latitude, string longitude)
        {
            return await _sightings.GetSpeciesByCoordinates(latitude, longitude);
        }
    }
}