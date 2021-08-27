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
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public AttractionType AttractionType { get; set; }
    }
}
