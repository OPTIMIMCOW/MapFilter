using FluentAssertions;
using System;
using System.Linq;
using System.Threading.Tasks;
using WhaleSpotting.Models.DbModels;
using WhaleSpotting.Models.Enums;
using WhaleSpotting.Models.RequestModels;
using WhaleSpotting.Models.ResponseModels;
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
        public void CreateSighting_CalledWithSightingRequestModel_ReturnsSightingResponseModelAndAddsToDb()
        {
            // Arrange
            var newSighting = new SightingRequestModel
            {
                Species = Species.AtlanticWhiteSidedDolphin,
                Quantity = 2,
                Description = "was nice",
                Longitude = -100.010,
                Latitude = -22.010,
                Location = "atlantic ocean",
                SightedAt = DateTime.Now,
                OrcaType = null,
                OrcaPod = "",
                UserId = 5,
            };

            // Act
            var result = _underTest.CreateSighting(newSighting);

            // Assert
            result.Should().BeOfType<SightingResponseModel>();
            result.Id.Should().Be(1);
            var sightingDbModel = Context.Sightings.Single();
            sightingDbModel.Species.Should().Be(newSighting.Species);
            sightingDbModel.OrcaType.Should().Be(newSighting.OrcaType);
        }

        [Fact]
        public void CreateSighting_CalledWithInvalidSightingRequestModel_ThrowsAnExceptionDoesNotAddToDb()
        {
            // Arrange
            var newSighting = new SightingRequestModel
            {
                Species = Species.AtlanticWhiteSidedDolphin,
                Quantity = 2,
                Description = "was nice",
                Longitude = -100.010,
                Latitude = -22.010,
                Location = "atlantic ocean",
                SightedAt = DateTime.Now.AddDays(1),
                OrcaType = null,
                OrcaPod = "",
                UserId = 5,
            };

            // Act
            Action act = () => _underTest.CreateSighting(newSighting);

            // Assert
            var exception = act.Should().Throw<Exception>().Subject;
            exception.Single().Message.Should().Be("Sighted At must be in the past");
            Context.Sightings.Should().BeEmpty();
        }
    }
}