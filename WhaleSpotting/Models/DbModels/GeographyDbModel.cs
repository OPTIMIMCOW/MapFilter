using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WhaleSpotting.Models.Enums;

namespace WhaleSpotting.Models.DbModels
{
    public class GeographyDbModel
    {
        public int Id { get; set; }
        public int ApiId { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public string AttractionType { get; set; }

        public GeographyDbModel()
        {

        }

        public GeographyDbModel(int apiId, double latitude, double longitude, string attractiontype)
        {
            ApiId = apiId;
            Latitude = latitude;
            Longitude = longitude;
            AttractionType = attractiontype;
        }
    }

}
