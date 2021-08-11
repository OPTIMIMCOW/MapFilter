using FakeItEasy;
using FluentAssertions;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using WhaleSpotting.Controllers;
using WhaleSpotting.Filters;
using WhaleSpotting.Models.DbModels;
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
        private readonly UserManager<UserDbModel> _userManager = A.Fake<UserManager<UserDbModel>>();
        private readonly SightingsController _underTest;

        public SightingsControllerTests()
        {
            _underTest = new SightingsController(_sightings, _userManager);
        }

        [Fact]
        public async Task GetAllSightings_CalledWithPageFilter_ReturnsSightings()
        {
            // Arrange
            var serviceResponse = new List<SightingResponseModel>
            {
                new SightingResponseModel(),
                new SightingResponseModel()
            };

            A.CallTo(() => _sightings.GetAllSightings())
                .Returns(serviceResponse);

            // Act
            var result = await _underTest.GetAllSightings();

            // Assert
            result.Should().HaveCount(2);
        }

        [Fact]
        public async void CreateSighting_CalledWithNewSighting_ReturnsCreatedResult()
        {
            // Arrange
            var currentUser = new UserDbModel
            {
                Id = "1",
                NormalizedEmail = "Test"
            };

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
                OrcaPod = ""
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
                Username = "FakeUser",
                Confirmed = false,
            };

            A.CallTo(() => _sightings.CreateSighting(newSighting, currentUser))
                .Returns(sightingResponse);

            A.CallTo(() => _userManager.GetUserAsync(A<ClaimsPrincipal>.Ignored))
                .Returns(currentUser);

            // Act
            var response = await _underTest.CreateSighting(newSighting);

            // Assert
            var createdResult = response.Should().BeOfType<CreatedResult>().Subject;
            createdResult.Location.Should().Contain(sightingResponse.Id.ToString());
            createdResult.Value.Should().Be(sightingResponse);
        }

        [Fact]
        public async void CreateSighting_CalledWithInvalidNewSighting_ReturnsValidationError()
        {
            // Arrange
            var currentUser = new UserDbModel
            {
                Id = "5",
                NormalizedEmail = "Test"
            };

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
                OrcaPod = ""
            };

            const string exceptionMessage = "Sighted At must be in the past";

            A.CallTo(() => _sightings.CreateSighting(newSighting, currentUser))
                .Throws(new Exception(exceptionMessage));

            A.CallTo(() => _userManager.GetUserAsync(A<ClaimsPrincipal>.Ignored))
                .Returns(currentUser);

            // Act
            var response = await _underTest.CreateSighting(newSighting);

            // Assert
            var validationErrorResult = response.Should().BeOfType<ObjectResult>().Subject;
            var validationProblemDetails = validationErrorResult.Value.Should().BeOfType<ValidationProblemDetails>().Subject;
            var errorMessage = validationProblemDetails.Errors["SightedAt"][0];
            errorMessage.Should().Be("Sighted At must be in the past");
        }

        [Fact]
        public async void SearchSighting_ValidSearchSighting_ReturnsSearchResult()
        {
            // Arrange
            var pageFilter = new PageFilter();
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
                Username = "FakeUser",
                Confirmed = false,
            };

            A.CallTo(() => _sightings.SearchSighting(searchSighting, pageFilter))
                .Returns(new List<SightingResponseModel> { sightingResponse });

            // Act
            var response = await _underTest.SearchSighting(searchSighting, pageFilter);

            // Assert
            var searchResult = response.Value.Should().BeOfType<List<SightingResponseModel>>().Subject;
            searchResult.Should().Contain(sightingResponse);
        }

        [Fact]
        public async void SearchSighting_CalledWithInvalidSearchSighting_ReturnsNotFound()
        {
            // Arrange
            var pageFilter = new PageFilter();
            var searchSighting = new SearchSightingRequestModel
            {
                Species = Species.Minke
            };

            A.CallTo(() => _sightings.SearchSighting(searchSighting, pageFilter))
                .Returns(new List<SightingResponseModel>());

            // Act
            var response = await _underTest.SearchSighting(searchSighting, pageFilter);

            // Assert
            response.Result.Should().BeOfType<NotFoundResult>();
        }

        [Fact]
        public async Task GetNotConfirmedSightings_Called_ReturnsUnconfirmedSightings()
        {
            // Arrange
            var pageFilter = new PageFilter();
            var serviceResponse = new List<SightingResponseModel>
            {
                new SightingResponseModel(),
                new SightingResponseModel(),
                new SightingResponseModel()
            };

            A.CallTo(() => _sightings.GetNotConfirmedSightings(pageFilter))
                .Returns(serviceResponse);

            // Act
            var result = await _underTest.GetNotConfirmedSightings(pageFilter);

            // Assert
            result.Should().HaveCount(3);
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
                Username = "FakeUser",
                Confirmed = true
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

        [Fact]
        public async void GetSpeciesByCoordinates_CalledWithLatLongInQuery_ReturnsListOfSpecies()
        {
            // Arrange
            var lat = 2.00;
            var lon = 2.00;

            var serviceResponse = new List<Species?>() { Species.AtlanticWhiteSidedDolphin };

            A.CallTo(() => _sightings.GetSpeciesByCoordinates(lat, lon))
                .Returns(serviceResponse);

            // Act
            var controllerResponse = await _underTest.GetSpeciesByCoordinates(lat, lon);

            // Assert
            controllerResponse.Should().BeOfType<List<Species?>>();
            controllerResponse.Should().Contain(Species.AtlanticWhiteSidedDolphin);
        }
    }
}