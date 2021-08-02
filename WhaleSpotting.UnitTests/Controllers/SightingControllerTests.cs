using FakeItEasy;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using WhaleSpotting.Controllers;
using WhaleSpotting.Models.Enums;
using WhaleSpotting.Models.RequestModels;
using WhaleSpotting.Models.ResponseModels;
using WhaleSpotting.Services;
using Xunit;

namespace WhaleSpotting.UnitTests.Controllers
{
    public class SightingsControllerTests
    {
        private readonly ISightingsService _sightings = A.Fake<ISightingsService>();
        private readonly SightingsController _underTest;

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

        [Fact]
        public void CreateSighting_NewSighting_CreatedResult()
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

            var sightingResponse = new SightingResponseModel
            {
                Id = 1,
                SightedAt = DateTime.Now,
                Species = "AtlanticWhiteSidedDolphin",
                Quantity = 2,
                Location = "atlantic ocean",
                Longitude = -100.010,
                Latitude = -22.010,
                Description = "was nice",
                OrcaType = "",
                OrcaPod = "",
                UserId = 5,
                Username = "FakeUser",
                Confirmed = false,
            };

            A.CallTo(() => _sightings.CreateSighting(newSighting))
                .Returns(sightingResponse);

            //Act
            var response = _underTest.CreateSighting(newSighting);

            //Assert
            var createdResult = response.Should().BeOfType<CreatedResult>().Subject;
            createdResult.Location.Should().Contain("1");
            createdResult.Value.Should().Be(sightingResponse);
        }

        [Fact]
        public void CreateSighting_NewSighting_BadRequest()
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

            var exception = new Exception("Sighted At must be in the past");

            A.CallTo(() => _sightings.CreateSighting(newSighting))
                .Throws(exception);

            //Act
            var response = _underTest.CreateSighting(newSighting);

            //Assert
            var badRequestResult = response.Should().BeOfType<BadRequestObjectResult>().Subject;
            badRequestResult.Value.Should().Be("Sighted At must be in the past");
            badRequestResult.StatusCode.Should().Be(400);
        }
    }
}