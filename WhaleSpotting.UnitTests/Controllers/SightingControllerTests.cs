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
        public async Task GetAllSightings_Called_ReturnsSightings()
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
            var result = await _underTest.GetAllSightings();

            // Assert
            result.Should().HaveCount(2);
        }

        [Fact]
        public void CreateSighting_CalledWithNewSighting_ReturnsCreatedResult()
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

            // Act
            var response = _underTest.CreateSighting(newSighting);

            // Assert
            var createdResult = response.Should().BeOfType<CreatedResult>().Subject;
            createdResult.Location.Should().Contain(sightingResponse.Id.ToString());
            createdResult.Value.Should().Be(sightingResponse);
        }

        [Fact]
        public void CreateSighting_CalledWithInvalidNewSighting_ReturnsBadRequest()
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

            const string exceptionMessage = "Sighted At must be in the past";

            A.CallTo(() => _sightings.CreateSighting(newSighting))
                .Throws(new Exception(exceptionMessage));

            // Act
            var response = _underTest.CreateSighting(newSighting);

            // Assert
            var badRequestResult = response.Should().BeOfType<BadRequestObjectResult>().Subject;
            badRequestResult.Value.Should().Be(exceptionMessage);
        }

        [Fact]
        public async void ConfirmSighting_CalledWithId_ReturnsSighting()
        {
            // Arrange
            const int id = 1;

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
                Confirmed = true,
            };

            A.CallTo(() => _sightings.ConfirmSighting(id))
                .Returns(sightingResponse);

            // Act
            var result = await _underTest.ConfirmSighting(id);

            // Assert
            result.Should().BeOfType<ActionResult<SightingResponseModel>>();
        }

        [Fact]
        public async void ConfirmSighting_CalledWithInvalidId_ReturnsNotFound()
        {
            // Arrange
            const int id = 1;

            A.CallTo(() => _sightings.ConfirmSighting(id))
                .Returns<SightingResponseModel>(null);

            // Act
            var result = await _underTest.ConfirmSighting(id);

            // Assert
            result.Result.Should().BeOfType<NotFoundResult>();
        }

        [Fact]
        public void SearchSighting_ValidSearchSighting_ReturnsSearchResult()
        {
            // Arrange
            var searchSighting = new SearchSightingRequestModel
            {
                Species = Species.AtlanticWhiteSidedDolphin

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

            A.CallTo(() => _sightings.SearchSighting(searchSighting))
                .Returns(new List<SightingResponseModel> { sightingResponse });

            // Act
            var response = _underTest.SearchSighting(searchSighting);

            // Assert
            var searchResult = response.Value.Should().BeOfType<List<SightingResponseModel>>().Subject;
            searchResult.Should().Contain(sightingResponse);
        }

        [Fact]
        public void SearchSighting_CalledWithInvalidSearchSighting_ReturnsNotFound()
        {
            // Arrange
            var searchSighting = new SearchSightingRequestModel
            {
                Species = Species.Minke
            };

            A.CallTo(() => _sightings.SearchSighting(searchSighting))
                .Returns(new List<SightingResponseModel>());

            // Act
            var response = _underTest.SearchSighting(searchSighting);

            // Assert
            response.Result.Should().BeOfType<NotFoundResult>();
        }

        [Fact]
        public async Task GetNotConfirmedSightings_Called_ReturnsUnconfirmedSightings()
        {
            // Arrange
            var serviceResponse = new List<SightingResponseModel>
            {
                new SightingResponseModel(),
                new SightingResponseModel(),
                new SightingResponseModel()
            };

            A.CallTo(() => _sightings.GetNotConfirmedSightings())
                .Returns(serviceResponse);

            // Act
            var result = await _underTest.GetNotConfirmedSightings();

            // Assert
            result.Should().HaveCount(3);
        }

        [Fact]
        public async void DeleteSighting_CalledWithId_ReturnsSighting()
        {
            // Arrange
            const int id = 1;

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
                Confirmed = true,
            };

            A.CallTo(() => _sightings.DeleteSighting(id))
                .Returns(sightingResponse);

            // Act
            var result = await _underTest.DeleteSighting(id);

            // Assert
            result.Should().BeOfType<ActionResult<SightingResponseModel>>();
        }

        [Fact]
        public async void DeleteSighting_CalledWithInvalidId_ReturnsNotFound()
        {
            // Arrange
            const int id = 1;

            A.CallTo(() => _sightings.DeleteSighting(id))
                .Returns<SightingResponseModel>(null);

            // Act
            var result = await _underTest.DeleteSighting(id);

            // Assert
            result.Result.Should().BeOfType<NotFoundResult>();
        }
    }
}