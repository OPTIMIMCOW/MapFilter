using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WhaleSpotting.Models.RequestModels
{
    public class BatchGeographyRequestModel
    {
        [JsonProperty("maxLatitude")]
        public double MaxLatitude { get; set; }

        [JsonProperty("minLatitude")]
        public double MinLatitude { get; set; }

        [JsonProperty("maxLongitude")]
        public double MaxLongitude { get; set; }

        [JsonProperty("minLongitude")]
        public double MinLongitude { get; set; }

        [JsonProperty("batchNumber")]
        public int BatchNumber { get; set; }
    }
}
