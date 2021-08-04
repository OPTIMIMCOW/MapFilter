using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;
using WhaleSpotting.Models.DbModels;
using WhaleSpotting.Models.Enums;

namespace WhaleSpotting.Models.ApiModels
{
    public class SightingApiModel
    {
        public string Id { get; set; }
        public string Species { get; set; }
        public int Quantity { get; set; }
        public string Description { get; set; }
        public string Url { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public string Location { get; set; }
        public DateTime SightedAt { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public string OrcaType { get; set; }

        public SightingDbModel ToDbModel()
        {
            var cities = new Dictionary<string, int>()
            {
                { "AtlanticWhiteSidedDolphin", 1 },
                { "CaliforniaSeaLion", 2},
                { "DallsPorpoise", 3},
                { "GrayWhale", 4},
                { "HarborPorpoise", 5},
                { "HarborSeal", 6},
                { "Humpback", 7},
                { "Minke", 8},
                { "NorthernElephantSeal", 9},
                { "Orca", 10},
                { "Other", 11},
                { "PacificWhiteSidedDolphin", 12},
                { "SeaOtter", 13},
                { "SouthernElephantSeal", 14},
                { "StellerSeaLion", 15},
                { "Unknown", 16}

            };


            return new SightingDbModel
            {
                ApiId = Id,
                Species = (Species)Enum.Parse(typeof(Species), Regex.Replace(Species, @"\s+", "")),
                Quantity = Quantity,
                Location = Location,
                Latitude = Latitude,
                Longitude = Longitude,
                Description = Description,
                SightedAt = SightedAt,
                CreatedAt = CreatedAt,
            };
    }


}
}