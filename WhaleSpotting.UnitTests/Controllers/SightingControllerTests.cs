using FakeItEasy;
using FluentAssertions;
using System.Collections.Generic;
using System.Threading.Tasks;
using WhaleSpotting.Controllers;
using WhaleSpotting.Models.ApiModels;
using WhaleSpotting.Services;
using Xunit;

namespace WhaleSpotting.UnitTests.Controllers
{
    public class SightingsControllerTests
    {
        private readonly SightingsController _underTest;
        private readonly ISightingService _sightings = A.Fake<ISightingService>();

        public SightingsControllerTests()
        {
            _underTest = new SightingsController(_sightings);
        }

        [Fact]
        public async Task GetInfo_Called_ReturnsSightings()
        {
            // Arrange
            var serviceResponse = new List<SightingResponseModel>
            {
                new SightingResponseModel(),
                new SightingResponseModel()
            };
        
            A.CallTo(() => _sightings.GetSightings())
                .Returns(serviceResponse);

            // Act
            var result = await _underTest.GetInfo();

            // Assert
            result.Should().HaveCount(2);
        }
    }
}