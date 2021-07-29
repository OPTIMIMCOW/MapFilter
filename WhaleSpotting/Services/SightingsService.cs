using System;
using System.Collections.Generic;
using WhaleSpotting.Models.ApiModels;
using WhaleSpotting.Models.DbModels;
using Newtonsoft.Json;
using RestSharp;
using System.Threading.Tasks;

namespace WhaleSpotting.Services
{
    public interface ISightingService
    {
        Task<List<SightingResponseModel>> GetSightings();
    }

    public class SightingsService : ISightingService
    {
        public WhaleSpottingContext _context;

        public SightingsService(WhaleSpottingContext context)
        {
            _context = context;
        }

        public async Task<List<SightingResponseModel>> GetSightings()
        {
            var client = new RestClient("http://hotline.whalemuseum.org/api.json");
            var sightings = await client.GetAsync<List<SightingResponseModel>>(new RestRequest());
            return sightings;
        }
    }
}
