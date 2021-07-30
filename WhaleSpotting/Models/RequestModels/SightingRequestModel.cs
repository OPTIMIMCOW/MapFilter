using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using WhaleSpotting.Models.Enums;

namespace WhaleSpotting.Models.RequestModels
{
    public class SightingRequestModel
    {
        [Required(ErrorMessage = "Species is required")]
        [Range(0, 15, ErrorMessage = "Species must be between 0 and 15")]
        public Species Species { get; set; }
        [Required(ErrorMessage = "Quantity is required")]
        [Range(1, int.MaxValue, ErrorMessage = "Quantity must be greater than {1}")]
        public int Quantity { get; set; }
        public string Description { get; set; }
        [Required(ErrorMessage = "Longitude is required")]
        [Range(-180.00, 180.00, ErrorMessage = "Longitude must be greater than {1}")]
        public double Longitude { get; set; }
        [Required(ErrorMessage = "Latitude is required")]
        [Range(-90.00, 90.00, ErrorMessage = "Latitude must be greater than {1}")]
        public double Latitude { get; set; }
        public string Location { get; set; }
        [Required(ErrorMessage = "SightedAt is required")]
        [DataType(DataType.Date, ErrorMessage = "This field is recieving date format: dd/mm/yyyy")]
        public DateTime SightedAt { get; set; }
        [Range(0, 3, ErrorMessage = "OrcaType must be between 0 and 3")]
        public OrcaType? OrcaType { get; set; }
        public string OrcaPod { get; set; }
        [Required(ErrorMessage = "UserId is required")]
        public int UserId { get; set; }
    }
}
