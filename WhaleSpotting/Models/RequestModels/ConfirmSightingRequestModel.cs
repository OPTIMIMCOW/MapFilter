using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using WhaleSpotting.Models.Enums;

namespace WhaleSpotting.Models.RequestModels
{
    public class ConfirmSightingRequestModel
    {
        [Required(ErrorMessage = "Id is required")]
        public int Id { get; set; }

        public bool Confirmation { get; set; }
    }
}
