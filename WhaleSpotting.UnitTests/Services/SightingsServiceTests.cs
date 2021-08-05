using FluentAssertions;
using System.Collections.Generic;
using System.Threading.Tasks;
using WhaleSpotting.Models.ApiModels;
using WhaleSpotting.Models.DbModels;
using WhaleSpotting.Services;
using Xunit;

namespace WhaleSpotting.UnitTests.Services
{
    public class SightingsServiceTests : ServiceTestsBase
    {
        private readonly ISightingsService _underTest;

        public SightingsServiceTests()
        {
            _underTest = new SightingsService(Context);
        }

        [Fact]
        public async Task GetSightings_Called_ReturnsSightings()
        {
            // Arrange
            var whaleSighting = new SightingDbModel
            {
                Quantity = 5,
                Description = "Whales at sea",
                SightedAt = System.DateTime.Now
            };

            await Context.Sightings.AddRangeAsync(new SightingDbModel(), whaleSighting);
            await Context.SaveChangesAsync();

            // Act
            var result = await _underTest.GetSightings();

            // Assert
            result.Should().HaveCount(2);
        }

        [Fact]
        public async Task AddSightings_CheckNuberOfAddedSightings()
        {
            var sightingToAdd = new List<SightingDbModel>();

            var whaleSighting = new SightingApiModel
            {
                
                Species = "orca",
                Quantity = "50",
                Location = "Southend",
                Latitude = 48.6213,
                Longitude = -123.2828,
                Description = "Sighted near lighthouse",
                SightedAt = System.DateTime.Now,
                CreatedAt = System.DateTime.Now,
                OrcaType = "unknown",
                OrcaPod = "j"
            };

            sightingToAdd.Add(whaleSighting.ToDbModel());

             _underTest.AddNewSightings(sightingToAdd);
         
            var result = await _underTest.GetSightings();

            result.Should().HaveCount(1);
        }
    }
}