using FluentAssertions;
using System;
using System.Collections.Generic;
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

        [Fact]
        public async void SearchSighting_CalledWithValidSightingRequestModel_ReturnsFilteredSightingResponseModel()
        {
            // Arrange
            Context.Add(new SightingDbModel
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
            }); 
            Context.Add(new SightingDbModel
            {
                Species = Species.Minke,
                Quantity = 2,
                Description = "was nice",
                Longitude = -100.010,
                Latitude = -22.010,
                Location = "atlantic ocean",
                SightedAt = DateTime.Now.AddDays(1),
                OrcaType = null,
                OrcaPod = "" 
            });
            Context.Add(new SightingDbModel
            {
                Species = Species.Minke,
                Quantity = 2,
                Description = "was nice",
                Longitude = -100.010,
                Latitude = -22.010,
                Location = "atlantic ocean",
                SightedAt = DateTime.Now.AddDays(1),
                OrcaType = null,
                OrcaPod = ""
            });

            Context.SaveChanges();
            var searchSighting = new SearchSightingRequestModel
            {
                Species = Species.Minke
            };

            // Act
            var result = await _underTest.SearchSighting(searchSighting);

            // Assert
            result.Should().HaveCount(2);
        }

        [Fact]
        public async void SearchSighting_CalledWithValidSightingRequestModelByDateRange_ReturnsFilteredByDateRangeSightingResponseModel()
        {
            // Arrange
            Context.Add(new SightingDbModel
            {
                Species = Species.AtlanticWhiteSidedDolphin,
                Quantity = 2,
                Description = "was nice",
                Longitude = -100.010,
                Latitude = -22.010,
                Location = "atlantic ocean",
                SightedAt = DateTime.Now.AddDays(-9),
                OrcaType = null,
                OrcaPod = ""
            });
            Context.Add(new SightingDbModel
            {
                Species = Species.Minke,
                Quantity = 2,
                Description = "was nice",
                Longitude = -100.010,
                Latitude = -22.010,
                Location = "atlantic ocean",
                SightedAt = DateTime.Now.AddDays(-10),
                OrcaType = null,
                OrcaPod = ""
            });
            Context.Add(new SightingDbModel
            {
                Species = Species.Minke,
                Quantity = 2,
                Description = "was nice",
                Longitude = -100.010,
                Latitude = -22.010,
                Location = "atlantic ocean",
                SightedAt = DateTime.Now.AddDays(-5),
                OrcaType = null,
                OrcaPod = ""
            });

            Context.SaveChanges();
            var searchSighting = new SearchSightingRequestModel
            {
                SightedFrom = DateTime.Now.AddDays(-7),
                SightedTo = DateTime.Now.AddDays(-1),
            };

            // Act
            var result = await _underTest.SearchSighting(searchSighting);

            // Assert
            result.Should().HaveCount(1);
        }

        [Fact]
        public async void SearchSighting_CalledWithValidSightingRequestModelByDateRangeAndOrcaPod_ReturnsFilteredByDateRangeAndOrcaPodSightingResponseModel()
        {
            // Arrange
            Context.Add(new SightingDbModel
            {
                Species = Species.AtlanticWhiteSidedDolphin,
                Quantity = 2,
                Description = "was nice",
                Longitude = -100.010,
                Latitude = -22.010,
                Location = "atlantic ocean",
                SightedAt = DateTime.Now.AddDays(-7),
                OrcaType = null,
                OrcaPod = ""
            });
            Context.Add(new SightingDbModel
            {
                Species = Species.Minke,
                Quantity = 2,
                Description = "was nice",
                Longitude = -100.010,
                Latitude = -22.010,
                Location = "atlantic ocean",
                SightedAt = DateTime.Now.AddDays(-1),
                OrcaType = null,
                OrcaPod = "k"
            });
            Context.Add(new SightingDbModel
            {
                Species = Species.Minke,
                Quantity = 2,
                Description = "was nice",
                Longitude = -100.010,
                Latitude = -22.010,
                Location = "atlantic ocean",
                SightedAt = DateTime.Now.AddDays(-5),
                OrcaType = null,
                OrcaPod = "k"
            });

            Context.SaveChanges();
            var searchSighting = new SearchSightingRequestModel
            {
                SightedFrom = DateTime.Now.AddDays(-7),
                SightedTo = DateTime.Now.AddDays(-1),
                OrcaPod = "k"
            };

            // Act
            var result = await _underTest.SearchSighting(searchSighting);

            // Assert
            result.Should().HaveCount(2);
        }

        [Fact]
        public async void SearchSighting_CalledWithValidSightingRequestModelByLocation_ReturnsFilteredByLocationSightingResponseModel()
        {
            // Arrange
            Context.Add(new SightingDbModel
            {
                Species = Species.AtlanticWhiteSidedDolphin,
                Quantity = 2,
                Description = "was nice",
                Longitude = -100.010,
                Latitude = -22.010,
                Location = "pacific ocean",
                SightedAt = DateTime.Now.AddDays(-7),
                OrcaType = null,
                OrcaPod = ""
            });
            Context.Add(new SightingDbModel
            {
                Species = Species.Minke,
                Quantity = 2,
                Description = "was nice",
                Longitude = -100.010,
                Latitude = -22.010,
                Location = "atlantic ocean",
                SightedAt = DateTime.Now.AddDays(-1),
                OrcaType = null,
                OrcaPod = "k"
            });
            Context.Add(new SightingDbModel
            {
                Species = Species.Minke,
                Quantity = 2,
                Description = "was nice",
                Longitude = -100.010,
                Latitude = -22.010,
                Location = "atlantic ocean",
                SightedAt = DateTime.Now.AddDays(-5),
                OrcaType = null,
                OrcaPod = "k"
            });

            Context.SaveChanges();
            var searchSighting = new SearchSightingRequestModel
            {
                Location = "pacific ocean"
            };

            // Act
            var result = await _underTest.SearchSighting(searchSighting);

            // Assert
            result.Should().HaveCount(1);
        }

        [Fact]
        public async void ConfirmSighting_CalledWithId_ReturnsSightingResponseModelAndConfirmedIsTrueInDb()
        {
            // Arrange
            const int id = 1;

            var sighting = new SightingDbModel
            {
                Id = 1,
                Species = Species.AtlanticWhiteSidedDolphin,
                Quantity = 2,
                Description = "was nice",
                Longitude = -100.010,
                Latitude = -22.010,
                Location = "atlantic ocean",
                SightedAt = DateTime.Now,
                OrcaType = null,
                OrcaPod = "",
                Confirmed = false,
            };

            await Context.Sightings.AddAsync(sighting);
            await Context.SaveChangesAsync();

            // Act
            var result = await _underTest.ConfirmSighting(id);

            // Assert
            result.Should().BeOfType<SightingResponseModel>();
            result.Confirmed.Should().Be(true);
            var sightingDbModel = Context.Sightings.Single();
            sightingDbModel.Confirmed.Should().Be(true);
        }

        [Fact]
        public async void ConfirmSighting_CalledWithInvalidId_ReturnsNullSightingResponseModel()
        {
            // Arrange
            const int id = 1;

            // Act
            var nullResult = await _underTest.ConfirmSighting(id);

            // Assert
            nullResult.Should().Be(null);
        }

        [Fact]
        public async Task GetNotConfirmedSightings_Called_UnconfirmedReturnsSightings()
        {
            // Arrange
            var sightings = new List<SightingDbModel>
            {
                new SightingDbModel
                {
                    Confirmed = false
                },
                new SightingDbModel
                {
                    Confirmed = true
                },
                new SightingDbModel
                {
                    Confirmed = false
                }
            };

            await Context.Sightings.AddRangeAsync(sightings);
            await Context.SaveChangesAsync();

            // Act
            var result = await _underTest.GetNotConfirmedSightings();

            // Assert
            result.Should().HaveCount(2);
        }

        [Fact]
        public async Task GetNotConfirmedSightings_Called_UnconfirmedReturnsNull()
        {
            // Arrange
            var sightings = new List<SightingDbModel>
            {
                new SightingDbModel
                {
                    Confirmed = true
                },
                new SightingDbModel
                {
                    Confirmed = true
                },
                new SightingDbModel
                {
                    Confirmed = true
                }
            };

            await Context.Sightings.AddRangeAsync(sightings);
            await Context.SaveChangesAsync();

            // Act
            var result = await _underTest.GetNotConfirmedSightings();

            // Assert
            result.Should().BeEmpty();
        }

        [Fact]
        public async void DeleteSighting_CalledWithId_ReturnsSightingResponseModelAndDeletedInDb()
        {
            // Arrange
            var sighting = new SightingDbModel
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
                Confirmed = false,
            };

            await Context.Sightings.AddAsync(sighting);
            await Context.SaveChangesAsync();

            // Act
            var result = await _underTest.DeleteSighting(sighting.Id);

            // Assert
            result.Should().BeOfType<SightingResponseModel>();
            Context.Sightings.Should().BeEmpty();
        }

        [Fact]
        public async void DeleteSighting_CalledWithInvalidId_ReturnsNullSightingResponseModel()
        {
            // Arrange
            const int id = 1;

            // Act
            var nullResult = await _underTest.DeleteSighting(id);

            // Assert
            nullResult.Should().Be(null);
        }

        [Fact]
        public async void GetSpeciesByCoordinates_CalledWithValidLatLong_ReturnsListOfStrings()
        {
            // Arrange
            var lat = "2";
            var lon = "2";

            var sighting = new SightingDbModel
            {
                Id = 1,
                Species = Species.AtlanticWhiteSidedDolphin,
                Quantity = 2,
                Description = "was nice",
                Longitude = Double.Parse(lon),
                Latitude = Double.Parse(lat),
                Location = "atlantic ocean",
                SightedAt = DateTime.Now,
                OrcaType = null,
                OrcaPod = "",
                Confirmed = false,
            };

            await Context.Sightings.AddAsync(sighting);
            await Context.SaveChangesAsync();

            // Act
            var result = await _underTest.GetSpeciesByCoordinates(lat, lon);

            // Assert
            result.Should().HaveCount(1);
            result.Should().Contain("AtlanticWhiteSidedDolphin");
        }

        [Fact]
        public async void GetSpeciesByCoordinates_CalledWithValidLatLong_ReturnsEmptyList()
        {
            // Arrange
            var lat = "2";
            var lon = "2";

            var sighting = new SightingDbModel
            {
                Id = 1,
                Species = Species.AtlanticWhiteSidedDolphin,
                Quantity = 2,
                Description = "was nice",
                Longitude = 100,
                Latitude = 20,
                Location = "atlantic ocean",
                SightedAt = DateTime.Now,
                OrcaType = null,
                OrcaPod = "",
                Confirmed = false,
            };

            await Context.Sightings.AddAsync(sighting);
            await Context.SaveChangesAsync();

            // Act
            var result = await _underTest.GetSpeciesByCoordinates(lat, lon);

            // Assert
            result.Should().HaveCount(0);
        }
    }
}