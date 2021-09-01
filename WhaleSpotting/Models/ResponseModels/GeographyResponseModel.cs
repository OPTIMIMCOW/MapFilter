using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WhaleSpotting.Models.Enums;
using WhaleSpotting.Models.DbModels;
using Newtonsoft.Json;

namespace WhaleSpotting.Models.ResponseModels
{
    public class GeographyResponseModel
    {
        [JsonProperty("id")]
        public int Id { get; set; }

        [JsonProperty("latitude")]
        public double Latitude { get; set; }

        [JsonProperty("longitude")]
        public double Longitude { get; set; }

        [JsonProperty("attractionType")]
        public AttractionType AttractionType { get; set; }

        public GeographyResponseModel(GeographyDbModel dbModel)
        {
            Id = dbModel.Id;
            Latitude = dbModel.Latitude;
            Longitude = dbModel.Longitude;
            AttractionType = (AttractionType)Enum.Parse(typeof (AttractionType), dbModel.AttractionType);
        }
    }
}
