﻿using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WhaleSpotting.Services;
using WhaleSpotting.Models.RequestModels;
using WhaleSpotting.Models.ResponseModels;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using WhaleSpotting.Constants;
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
        public async Task<List<SightingResponseModel>> GetInfo([FromQuery] PageFilter pageFilter)
        public async Task<List<SightingResponseModel>> GetAllSightings()
        {
            return await _sightings.GetSightings(pageFilter);
        }

        [Authorize]
        [HttpGet("/search")]
        public async Task<ActionResult<List<SightingResponseModel>>> SearchSighting([FromQuery] SearchSightingRequestModel searchSighting)
        {
            var result = await _sightings.SearchSighting(searchSighting);
            return result.Any() ? result: NotFound();
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

        [Authorize(Roles = AuthConstants.Admin )]
        [HttpPut("{id}/confirm")]
        public async Task<ActionResult<SightingResponseModel>> ConfirmSighting([FromRoute] int id)
        {
            var sighting = await _sightings.ConfirmSighting(id);
            return sighting == null ? NotFound() : sighting;
        }

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
    }
}