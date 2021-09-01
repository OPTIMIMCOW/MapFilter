using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace WhaleSpotting.Models.ResponseModels
{
    public class BatchGeographyResponseModel
    {
        [JsonProperty("batch")]
        public int Batch { get; set; }

        [JsonProperty("geography")]
        public List<GeographyResponseModel> Geography { get; set; }

        public BatchGeographyResponseModel(int batch, List<GeographyResponseModel> geography)
        {
            Batch = batch;
            Geography = geography;
        }
    }
}
