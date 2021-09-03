using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WhaleSpotting.Models.Enums;

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
        public AttractionType? Attraction1 { get; set; }

        [JsonProperty("attraction2")]
        public AttractionType? Attraction2 { get; set; }

        [JsonProperty("attraction3")]
        public AttractionType? Attraction3 { get; set; }

        [JsonProperty("distance12")]
        public int? Distance12 { get; set; }

        [JsonProperty("distance13")]
        public int? Distance13 { get; set; }
    }
}
