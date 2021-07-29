using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
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
        public async Task<List<SightingResponseModel>> GetInfo()
        {
            var sightings = await _sightings.GetSightings();
            return sightings;
        }
    }
}