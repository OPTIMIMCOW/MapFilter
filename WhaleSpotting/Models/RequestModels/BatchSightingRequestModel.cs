using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WhaleSpotting.Models.RequestModels
{
    public class BatchSightingRequestModel
    {
        public double maxLatitude { get; set; }
        public double minLatitude { get; set; }
        public int batchNumber { get; set; }
    }
}
