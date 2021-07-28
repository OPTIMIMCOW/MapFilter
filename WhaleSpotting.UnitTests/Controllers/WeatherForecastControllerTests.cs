using FluentAssertions;
using WhaleSpotting.Controllers;
using Xunit;

namespace WhaleSpotting.UnitTests.Controllers
{
    public class WeatherForecastControllerTests
    {
        private readonly SightingController _underTest;

        public WeatherForecastControllerTests()
        {
            _underTest = new SightingController();
        }

        [Fact]
        public void Get_WhenCalled_Returns5Models()
        {
            // Act
            var result = _underTest.Get();

            // Assert
            result.Should().HaveCount(5);
        }
    }
}