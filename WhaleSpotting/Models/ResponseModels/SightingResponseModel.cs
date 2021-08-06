using Newtonsoft.Json;
using System;
using WhaleSpotting.Models.DbModels;

namespace WhaleSpotting.Models.ResponseModels
{
    public class SightingResponseModel
    {
        [JsonProperty("id")]
        public int Id { get; set; }

        [JsonProperty("sighted_at")]
        public DateTime SightedAt { get; set; }

        [JsonProperty("species")]
        public string Species { get; set; }

        [JsonProperty("quantity")]
        public int? Quantity { get; set; }

        [JsonProperty("location")]
        public string Location { get; set; }

        [JsonProperty("longitude")]
        public double Longitude { get; set; }

        [JsonProperty("latitude")]
        public double Latitude { get; set; }

        [JsonProperty("description")]
        public string Description { get; set; }

        [JsonProperty("orca_type")]
        public string OrcaType { get; set; }

        public string OrcaPod { get; set; }

        public int? UserId { get; set; }

        public string Username { get; set; }

        public bool Confirmed { get; set; }

        public SightingResponseModel()
        {
            Confirmed = true;
            Username = "Whale Museum";
        }

        public SightingResponseModel(bool confirmed)
        {
            Confirmed = confirmed;
            //TODO - Use real UserId and Username
            UserId = 4;
            Username = "FakeUser";
        }

        public SightingResponseModel(SightingDbModel sighting)
        {
            Id = sighting.Id;
            SightedAt = sighting.SightedAt;
            Species = sighting.Species.ToString();
            Quantity = sighting.Quantity;
            Location = sighting.Location;
            Longitude = sighting.Longitude;
            Latitude = sighting.Latitude;
            Description = sighting.Description;
            OrcaType = sighting.OrcaType.ToString();
            OrcaPod = sighting.OrcaPod;
            Confirmed = sighting.Confirmed;

            //TODO - Use real UserId and Username
            UserId = 4;
            Username = "FakeUser";
        }
    }
}