using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WhaleSpotting.Models.Enums;
using WhaleSpotting.Models.DbModels;

namespace WhaleSpotting.Models.ResponseModels
{
    public class GeographyResponseModel
    {
        public int Id { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public AttractionType AttractionType { get; set; }

        public GeographyResponseModel(GeographyDbModel dbModel)
        {
            Id = dbModel.Id;
            Latitude = dbModel.Latitude;
            Longitude = dbModel.Longitude;
        }
    }
}
