using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Text;
using System.Net;
using RestSharp;
using WhaleSpotting.Models.ApiModels;
using WhaleSpotting.Models.DbModels;
using WhaleSpotting.Services;
using Microsoft.AspNetCore.Authorization;

namespace WhaleSpotting.Controllers
{
    [ApiController]
    [Route("/getapidata")]
    public class ApiDataController : ControllerBase
    {
        private readonly ISightingsService _sightings;

        public ApiDataController(ISightingsService sightings)
        {
            _sightings = sightings;
        }

        [HttpPost("")]
        public async Task<OkResult> GetApiData()
        {
            var page = 1;
            var hasResults = true;
            var sightingsToAdd = new List<SightingDbModel>();
            var client = new RestClient("https://hotline.whalemuseum.org/");

            while (hasResults)
            {
                var request = new RestRequest($"api.json?limit=1000&page={page}", DataFormat.Json);
                var apiSightings = await client.GetAsync<List<SightingApiModel>>(request);
                if (apiSightings.Any())
                {
                    sightingsToAdd.AddRange(apiSightings.Select(apiSighting => apiSighting.ToDbModel()).ToList());
                    page++;
                }
                else
                {
                    hasResults = false;
                }
            }

            if (sightingsToAdd.Any())
            {
                _sightings.AddNewSightings(sightingsToAdd);
            }
            
            return Ok();
        }
    }
}