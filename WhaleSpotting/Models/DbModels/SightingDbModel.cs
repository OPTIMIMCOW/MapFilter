using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using WhaleSpotting.Models.Enums;

namespace WhaleSpotting.Models.DbModels
{
    public class SightingDbModel
    {
        public int Id { get; set; }
        public Species Species { get; set; }
        public int Quantity { get; set; }
        public string Description { get; set; }
        public double Longitude { get; set; }
        public double Latitude { get; set; }
        public string Location { get; set; }
        public DateTime SightedAt { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public OrcaType? OrcaType { get; set; }
        public string OrcaPod { get; set; }
        public bool Confirmed { get; set; }

        public UserDbModel User {get; set; }
    }
}