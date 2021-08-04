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
            var species = new Dictionary<string, int>()
            {
                { "atlanticwhite-sideddolphin", 1 },
                { "californiasealion", 2},
                { "dallsporpoise", 3},
                { "graywhale", 4},
                { "harborporpoise", 5},
                { "harborSeal", 6},
                { "humpback", 7},
                { "minke", 8},
                { "northernelephantseal", 9},
                { "orca", 10},
                { "other", 11},
                { "pacificwhite-sideddolphin", 12},
                { "seaotter", 13},
                { "southernelephantseal", 14},
                { "stellersealion", 15},
                { "unknown", 16}

            };

            var orcatype = new Dictionary<string, int>()
            {
                { "northernresident", 1 },
                { "offshore", 2 },
                { "southernresident", 3 },
                { "transient", 4 },
                { "unknown", 5 }
            };

            // Enum.Parse(typeof(Species), Regex.Replace((species.FirstOrDefault(x => x.Value == Species).Key), @"\s+", "")),
            return new SightingDbModel
            {
                ApiId = Id,
                Species = (Species)species[Regex.Replace(Species, @"\s+", "")],
                Quantity = Quantity,
                Location = Location,
                Latitude = Latitude,
                Longitude = Longitude,
                Description = Description,
                SightedAt = SightedAt,
                CreatedAt = CreatedAt,
                OrcaType = (OrcaType)orcatype[Regex.Replace(OrcaType, @"\s+", "")]
            };
    }


}
}