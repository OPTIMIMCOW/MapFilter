using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WhaleSpotting.Models.Enums;

namespace WhaleSpotting.Models.RequestModels
{
    public class SightingRequestModel
    {
        public Species Species { get; set; }
        public int Quantity { get; set; }
        public string Description { get; set; }
        public double Longitude { get; set; }
        public double Latitude { get; set; }
        public string Location { get; set; }
        public DateTime SightedAt { get; set; }
        public OrcaType? OrcaType { get; set; }
        public string OrcaPod { get; set; }
        public int UserId { get; set; }
    }
}
