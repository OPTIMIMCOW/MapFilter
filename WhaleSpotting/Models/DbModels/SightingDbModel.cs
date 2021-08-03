using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.RegularExpressions;
using WhaleSpotting.Models.ApiModels;
using WhaleSpotting.Models.Enums;

namespace WhaleSpotting.Models.DbModels
{
    public class SightingDbModel
    {
        public int Id { get; set; }

        public string ApiId { get; set; }
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

        public SightingDbModel ()
        {

        }

        public SightingDbModel(SightingApiModel apiModel)
        {
            ApiId = apiModel.Id;
            Species = (Species)Enum.Parse(typeof(Species), Regex.Replace(apiModel.Species, @"\s+", ""));
            Quantity = apiModel.Quantity;
            Location = apiModel.Location;
            Latitude = apiModel.Latitude;
            Longitude = apiModel.Longitude;
            Description = apiModel.Description;
            SightedAt = apiModel.SightedAt;
            CreatedAt = apiModel.CreatedAt;
        }
    }
}