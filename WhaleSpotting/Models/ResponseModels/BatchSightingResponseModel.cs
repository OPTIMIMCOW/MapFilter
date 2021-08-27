using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace WhaleSpotting.Models.ResponseModels
{
    public class BatchSightingResponseModel
    {
        [JsonProperty("batch")]
        public int Batch { get; set; }

        [JsonProperty("sightings")]
        public List<SightingResponseModel> Sightings { get; set; }

        public BatchSightingResponseModel(int batch, List<SightingResponseModel> sightings)
        {
            Batch = batch;
            Sightings = sightings;
        }
    }
}
