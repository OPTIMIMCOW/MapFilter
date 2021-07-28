using FluentAssertions;
using WhaleSpotting.Controllers;
using WhaleSpotting.Services;
using Xunit;

namespace WhaleSpotting.UnitTests.Controllers
{
    public class GetInfoTest
    {
        private readonly SightingsController _underTest;
        private readonly ISightingServices _sightings;

        public GetInfoTest()
        {
            _underTest = new SightingsController(_sightings);
        }

        [Fact]
        public void Get_WhenCalled_Returns5Models()
        {
            // Act
            var result = _underTest.GetInfo();

            // Assert
            result.Should().NotBeNull();
        }
    }
}