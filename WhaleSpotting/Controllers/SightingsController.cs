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
        private readonly ISightingService _sightings;

        public SightingsController(ISightingService sightings)
        {
            _sightings = sightings;
        }
        [HttpGet]
        public IActionResult GetInfo()
        {
            return Created(Url.Action("Get"), _sightings.GetSightings());
        }
    }
}