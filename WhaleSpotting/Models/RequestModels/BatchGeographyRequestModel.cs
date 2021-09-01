using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WhaleSpotting.Models.RequestModels
{
    public class BatchGeographyRequestModel
    {
        public double maxLatitude { get; set; }
        public double minLatitude { get; set; }
        public double maxLongitude { get; set; }
        public double minLongitude { get; set; }
        public int batchNumber { get; set; }
    }
}
