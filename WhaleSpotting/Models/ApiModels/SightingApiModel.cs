using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using WhaleSpotting.Models.DbModels;
using WhaleSpotting.Models.Enums;

namespace WhaleSpotting.Models.ApiModels
{
    public class SightingApiModel
    {
        public string Id { get; set; }
        public string Species { get; set; }
        public string Quantity { get; set; }
        public string Description { get; set; }
        public string Url { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public string Location { get; set; }
        public DateTime SightedAt { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public string OrcaType { get; set; }
        public string OrcaPod { get; set; }


        public SightingDbModel ToDbModel()
        {
            var speciesLookup = new Dictionary<string, int>()
            {
                { "atlanticwhitesideddolphin", 1 },
                { "californiasealion", 2},
                { "dallsporpoise", 3},
                { "graywhale", 4},
                { "harborporpoise", 5},
                { "harborseal", 6},
                { "humpback", 7},
                { "humpbackwhale", 7},
                { "minke", 8},
                { "minkewhale", 8},
                { "northernelephantseal", 9},
                { "orca", 10},
                { "other", 11},
                { "pacificwhitesideddolphin", 12},
                { "seaotter", 13},
                { "southernelephantseal", 14},
                { "stellersealion", 15},
                { "unknown", 16}
            };

            var orcaTypeLookup = new Dictionary<string, int>()
            {
                { "northernresident", 1 },
                { "offshore", 2 },
                { "southernresident", 3 },
                { "transient", 4 },
                { "unknown", 5 }
            };

            if (!int.TryParse(Quantity, out var quantity))
            {
                quantity = 0;
            }

            Species? species = string.IsNullOrEmpty(Species)
                ? null
                : (Species)speciesLookup[Regex.Replace(
                    Species,
                    @"[^a-zA-Z]+", 
                    "")];
            OrcaType? orcaType = string.IsNullOrEmpty(OrcaType)
                ? null
                : (OrcaType)orcaTypeLookup[Regex.Replace(
                    OrcaType,
                    @"\s+",
                    "")];


            // Enum.Parse(typeof(Species), Regex.Replace((species.FirstOrDefault(x => x.Value == Species).Key), @"\s+", "")),
            return new SightingDbModel
            {
                ApiId = Id,
                Species = species,
                Quantity = quantity,
                Location = Location,
                Latitude = Latitude,
                Longitude = Longitude,
                Description = Description,
                SightedAt = SightedAt,
                CreatedAt = CreatedAt,
                OrcaType = orcaType,
                OrcaPod = OrcaPod
            };
        }
    }
}