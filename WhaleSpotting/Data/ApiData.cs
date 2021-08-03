using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using RestSharp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using WhaleSpotting.Models.DbModels;

namespace WhaleSpotting.Data
{
    public class ApiData
    {
        public static async void GetApiData()
        {
            var client = new RestClient("http://hotline.whalemuseum.org/");
            var request = new RestRequest($"api.json?limit=1000&page={page}", DataFormat.Json);
            var apiSightings = await client.GetAsync<List<SightingApiModel>>(request);
            
           
            
        }
    }
}    
