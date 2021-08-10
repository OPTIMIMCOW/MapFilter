using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using RestSharp;
using WhaleSpotting.Models.ApiModels;
using WhaleSpotting.Models.DbModels;
using WhaleSpotting.Services;

namespace WhaleSpotting.Controllers
{
    [ApiController]
    [Route("/api/getapidata")]
    public class ApiDataController : ControllerBase
    {
        private readonly ISightingsService _sightings;

        public ApiDataController(ISightingsService sightings)
        {
            _sightings = sightings;
        }

        [HttpPost]
        public async Task<IActionResult> GetApiData()
        {
            var page = 1;
            var hasResults = true;
            var client = new RestClient("https://hotline.whalemuseum.org/");

            while (hasResults)
            {
                var request = new RestRequest($"api.json?limit=1000&page={page}", DataFormat.Json);
                var apiSightings = await client.GetAsync<List<SightingApiModel>>(request);

                if (apiSightings.Any())
                {
                    var sightingsToAdd = apiSightings.Select(apiSighting => apiSighting.ToDbModel()).ToList();
                    page++;

                    if (sightingsToAdd.Any())
                    {
                        await _sightings.CreateSightingsAsync(sightingsToAdd);
                    }
                }
                else
                {
                    hasResults = false;
                }
            }

            return Ok();
        }
    }
}