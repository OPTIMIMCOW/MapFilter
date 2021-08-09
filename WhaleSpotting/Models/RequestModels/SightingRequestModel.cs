using System;
using System.ComponentModel.DataAnnotations;
using WhaleSpotting.Models.Enums;

namespace WhaleSpotting.Models.RequestModels
{
    public class SightingRequestModel
    {
        [Required(ErrorMessage = "Species is required")]
        [Range(1, 16, ErrorMessage = "Species must be between 1 and 16")]
        public Species Species { get; set; }

        [Required(ErrorMessage = "Quantity is required")]
        [Range(1, int.MaxValue, ErrorMessage = "Quantity must be greater than 0")]
        public int Quantity { get; set; }

        public string Description { get; set; }

        [Required(ErrorMessage = "Longitude is required")]
        [Range(-180.00, 180.00, ErrorMessage = "Longitude must be between -180 and 180 degrees")]
        public double Longitude { get; set; }

        [Required(ErrorMessage = "Latitude is required")]
        [Range(-90.00, 90.00, ErrorMessage = "Latitude must be between -90 and 90 degrees")]
        public double Latitude { get; set; }

        public string Location { get; set; }

        [Required(ErrorMessage = "SightedAt is required")]
        [DataType(DataType.Date, ErrorMessage = "This field is receiving date format: dd/mm/yyyy")]
        public DateTime SightedAt { get; set; }

        [Range(1, 4, ErrorMessage = "OrcaType must be between 1 and 4")]
        public OrcaType? OrcaType { get; set; }

        public string OrcaPod { get; set; }

        [Required(ErrorMessage = "UserId is required")]
        public int UserId { get; set; }
    }
}
