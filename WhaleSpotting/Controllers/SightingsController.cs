using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using WhaleSpotting.Models.ApiModels;
using WhaleSpotting.Services;

namespace WhaleSpotting.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SightingsController : ControllerBase
    {
        //private static readonly ILogger Logger = LogManager.GetCurrentClassLogger();
        private readonly ISightingServices _sightings;

        public SightingsController(ISightingServices sightings)
        {
            _sightings = sightings;
        }
        [HttpGet]
        public IActionResult GetInfo()
        {
            return Created(Url.Action("Get", new { id = 2 }), _sightings.GetSightings());
        }
    }
}