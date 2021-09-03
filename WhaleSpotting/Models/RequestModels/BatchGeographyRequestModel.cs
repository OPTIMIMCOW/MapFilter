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

        [JsonProperty("attraction1")]
        public string Attraction1 { get; set; }

        [JsonProperty("attraction2")]
        public string Attraction2 { get; set; }

        [JsonProperty("attraction3")]
        public string Attraction3 { get; set; }

        [JsonProperty("distance12")]
        public string Distance12 { get; set; }

        [JsonProperty("distance23")]
        public string Distance23 { get; set; }
    }
}
