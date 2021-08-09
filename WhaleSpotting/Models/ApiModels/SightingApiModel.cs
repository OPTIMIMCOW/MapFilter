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
            var speciesLookup = new Dictionary<string, Species>()
            {
                { "atlanticwhitesideddolphin", (Species)1 },
                { "californiasealion",(Species) 2},
                { "dallsporpoise", (Species)3},
                { "graywhale", (Species)4},
                { "harborporpoise", (Species)5},
                { "harborseal", (Species)6},
                { "humpback", (Species)7},
                { "humpbackwhale", (Species)7},
                { "minke", (Species)8},
                { "minkewhale", (Species)8},
                { "northernelephantseal", (Species)9},
                { "orca", (Species)10},
                { "other", (Species)11},
                { "pacificwhitesideddolphin", (Species)12},
                { "seaotter", (Species)13},
                { "southernelephantseal", (Species)14},
                { "stellersealion", (Species)15},
                { "unknown", (Species)16}
            };

            var orcaTypeLookup = new Dictionary<string, OrcaType>()
            {
                { "northernresident", (OrcaType)1 },
                { "offshore", (OrcaType)2 },
                { "southernresident", (OrcaType)3 },
                { "transient", (OrcaType)4 },
                { "unknown", (OrcaType)5 }
            };

            if (!int.TryParse(Quantity, out var quantity))
            {
                quantity = 0;
            }

            Species? species = string.IsNullOrEmpty(Species)
                ? null
                : speciesLookup[Regex.Replace(
                    Species,
                    @"[^a-zA-Z]+", 
                    "")];
            OrcaType? orcaType = string.IsNullOrEmpty(OrcaType)
                ? null
                : orcaTypeLookup[Regex.Replace(
                    OrcaType,
                    @"\s+",
                    "")];

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
                OrcaPod = OrcaPod,
                Confirmed = true
            };
        }
    }
}