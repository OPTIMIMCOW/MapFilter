using FluentAssertions;
using System.Threading.Tasks;
using WhaleSpotting.Models.DbModels;
using WhaleSpotting.Services;
using Xunit;

namespace WhaleSpotting.UnitTests.Services
{
    public class SightingsServiceTests : ServiceTestsBase
    {
        private readonly ISightingService _underTest;

        public SightingsServiceTests()
        {
            _underTest = new SightingsService(Context);
        }

        [Fact]
        public async Task GetSightings_Called_ReturnsSightings()
        {
            // Arrange
            await Context.Sightings.AddAsync(new SightingDbModel());
            await Context.SaveChangesAsync();

            // Act
            var result = await _underTest.GetSightings();

            // Assert
            result.Should().NotBeEmpty();
        }
    }
}