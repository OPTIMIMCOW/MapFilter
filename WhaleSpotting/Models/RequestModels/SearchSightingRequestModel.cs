using System;
using System.ComponentModel.DataAnnotations;
using WhaleSpotting.Models.Enums;

namespace WhaleSpotting.Models.RequestModels
{
    public class SearchSightingRequestModel
    {
        [Range(1, 16, ErrorMessage = "Species must be between 1 and 16")]
        public Species? Species { get; set; }

        [Range(-180.00, 180.00, ErrorMessage = "Longitude must be between -180 and 180 degrees")]
        public double? Longitude { get; set; }

        [Range(-90.00, 90.00, ErrorMessage = "Latitude must be between -90 and 90 degrees")]
        public double? Latitude { get; set; }
        public string Location { get; set; } = null;

        [DataType(DataType.Date, ErrorMessage = "This field is receiving date format: dd/mm/yyyy")]
        public DateTime? SightedFrom { get; set; }

        [DataType(DataType.Date, ErrorMessage = "This field is receiving date format: dd/mm/yyyy")]
        public DateTime? SightedTo { get; set; }

        [Range(1, 4, ErrorMessage = "OrcaType must be between 1 and 4")]
        public OrcaType? OrcaType { get; set; }

        public string OrcaPod { get; set; } = null;
        public bool? Confirmed { get; set; }
    }
}