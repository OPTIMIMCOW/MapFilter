using System;
using WhaleSpotting.Models.DbModels;
using WhaleSpotting.Models.Enums;

namespace WhaleSpotting.Models.ApiModels
{
    public class SightingResponseModel
    {
        public DateTime SightedAt { get; set; }
        public Species Species { get; set; }
        public int Quantity { get; set; }
        public string Location { get; set; }
        public double Longitude { get; set; }
        public double Latitude { get; set; }
        public string Description { get; set; }
        public OrcaType? OrcaType { get; set; }
        public string OrcaPod { get; set; }
        public int? UserId { get; set; }
        public string Username { get; set; }
        public bool Confirmed { get; set; }

        public SightingResponseModel(SightingDbModel sighting)
        {
            SightedAt = sighting.SightedAt;
            Species = sighting.Species;
            Quantity = sighting.Quantity;
            Location = sighting.Location;
            Longitude = sighting.Longitude;
            Latitude = sighting.Latitude;
            Description = sighting.Description;
            OrcaType = sighting.OrcaType;
            OrcaPod = sighting.OrcaPod;
            Confirmed = sighting.Confirmed;

            //TODO - Use real UserId and Username
            UserId = 4;
            Username = "FakeUser";
        }
    }
}