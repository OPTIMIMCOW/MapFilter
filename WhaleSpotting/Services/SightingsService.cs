using System;
using System.Collections.Generic;
using WhaleSpotting.Models.ApiModels;
using WhaleSpotting.Models.DbModels;
using Newtonsoft.Json;
using RestSharp;

namespace WhaleSpotting.Services
{
    public interface ISightingServices
    {
        List<SightingResponseModel> GetSightings();
        //IEnumerable<SightingResponseModel> GetSightings();
    }

    public class SightingsService : ISightingServices
    {
        public WhaleSpottingContext _context;

        public SightingsService(WhaleSpottingContext context)
        {
            _context = context;
        }

        public List<SightingResponseModel> GetSightings()
        {
            var client = new RestClient("http://hotline.whalemuseum.org/api.json");
            var sightings = JsonConvert.DeserializeObject <List<SightingResponseModel>> (client.Execute(new RestRequest()).Content);
            return sightings;
        }
    }
}
