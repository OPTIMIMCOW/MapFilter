using FakeItEasy;
using FluentAssertions;
using System.Threading.Tasks;
using WhaleSpotting.Models.DbModels;
using WhaleSpotting.Services;
using Xunit;

namespace WhaleSpotting.UnitTests.Controllers
{
    public class SightingsServiceTests
    {
        //private readonly WhaleSpottingContext _context;
        private readonly ISightingService _underTest;

        public SightingsServiceTests(WhaleSpottingContext context)
        {
            //_context = context;
            //_underTest = new SightingsService(_context);
        }

        [Fact]
        public async Task GetSightings_Called_ReturnsSightings()
        {
            // Arrange
 
        
            //A.CallTo(() => _underTest.GetSightings())
            //    .Returns(serviceResponse);

            // Act
            var result = await _underTest.GetSightings();

            // Assert
            result.Should().NotBeEmpty();
        }
    }
}