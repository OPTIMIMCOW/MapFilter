using FluentAssertions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WhaleSpotting.Models.ApiModels;
using WhaleSpotting.Filters;
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
        public async Task GetAllSightings_Called_ReturnsConfirmedSightings()
        {
            // Arrange
            var sightings = new List<SightingDbModel>
            {
                new SightingDbModel
                {
                    Id = 1,
                    Confirmed = true
                },
                new SightingDbModel
                {
                    Id = 2,
                    Confirmed = true
                },
                new SightingDbModel
                {
                    Id = 3,
                    Confirmed = false
                }
            };

            await Context.Sightings.AddRangeAsync(sightings);
            await Context.SaveChangesAsync();

            // Act
            var result = await _underTest.GetAllSightings();

            // Assert
            result.Should().HaveCount(2);
        }

        [Fact]
        public void CreateSightings_CalledWithSightingsApiModel_ReturnListSightingResponseModelAndAddsToDb()
        {
            // Arrange
            var sightingToAdd = new List<SightingDbModel>();
            var whaleSighting = new SightingApiModel
            {
                Species = "orca",
                Quantity = "50",
                Location = "Southend",
                Latitude = 48.6213,
                Longitude = -123.2828,
                Description = "Sighted near lighthouse",
                SightedAt = DateTime.Now,
                CreatedAt = DateTime.Now,
                OrcaType = "unknown",
                OrcaPod = "j"
            };

            sightingToAdd.Add(whaleSighting.ToDbModel());
            sightingToAdd.Add(whaleSighting.ToDbModel());

            // Act
            var result = _underTest.CreateSightings(sightingToAdd);

            // Assert
            result.Should().BeOfType<List<SightingResponseModel>>();
            result.Should().HaveCount(2);

            var whaleSightingsDbModels = Context.Sightings.Where(s => s.Description == whaleSighting.Description).ToList();
            whaleSightingsDbModels.Should().HaveCount(2);
            whaleSightingsDbModels.Should().BeOfType<List<SightingDbModel>>();
        }

        [Fact]
        public async Task GetSightings_Called_ReturnsSightingsWithUser()
        {
            // Arrange
            var user = new UserDbModel
            {
                UserName = "test@example.com"
            };
            var whaleSighting = new SightingDbModel
            {
                Quantity = 5,
                Description = "Whales at sea",
                SightedAt = DateTime.Now,
                User = user,
                Confirmed = true
            };

            await Context.Sightings.AddAsync(whaleSighting);
            await Context.SaveChangesAsync();

            // Act
            var result = await _underTest.GetAllSightings();

            // Assert
            var sighting = result.Should().BeOfType<List<SightingResponseModel>>().Subject.Single();
            sighting.Username.Should().Be(user.UserName.Split("@")[0]);
        }

        [Fact]
        public void CreateSighting_CalledWithSightingRequestModel_ReturnsSightingResponseModelAndAddsToDb()
        {
            // Arrange
            var currentUser = new UserDbModel
            {
                Id = "1",
                UserName = "test@example.com"        
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

            // Act
            var result = _underTest.CreateSighting(newSighting, currentUser);

            // Assert
            result.Should().BeOfType<SightingResponseModel>();
            result.Id.ToString().Should().Be(currentUser.Id);
            var sightingDbModel = Context.Sightings.Single();
            sightingDbModel.Species.Should().Be(newSighting.Species);
            sightingDbModel.OrcaType.Should().Be(newSighting.OrcaType);
        }

        [Fact]
        public void CreateSighting_CalledWithInvalidSightingRequestModel_ThrowsAnExceptionDoesNotAddToDb()
        {
            // Arrange
            var currentUser = new UserDbModel
            {
                Id = "1"
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

            // Act
            Action act = () => _underTest.CreateSighting(newSighting, currentUser);

            // Assert
            var exception = act.Should().Throw<Exception>().Subject;
            exception.Single().Message.Should().Be("Date of sighting must be in the past");
            Context.Sightings.Should().BeEmpty();
        }

        [Fact]
        public async void SearchSighting_CalledWithValidSightingRequestModel_ReturnsFilteredSightingResponseModel()
        {
            // Arrange
            var pageFilter = new PageFilter();

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
                OrcaPod = "",
                Confirmed = true,
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
                OrcaPod = "",
                Confirmed = true,
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
                OrcaPod = "",
                Confirmed = true,
            });

            Context.SaveChanges();
            var searchSighting = new SearchSightingRequestModel
            {
                Species = Species.Minke
            };

            // Act
            var result = await _underTest.SearchSighting(searchSighting, pageFilter);

            // Assert
            result.Should().HaveCount(2);
        }

        [Fact]
        public async void SearchSighting_CalledWithValidSightingRequestModelByDateRange_ReturnsFilteredByDateRangeSightingResponseModel()
        {
            // Arrange
            var pageFilter = new PageFilter();
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
                OrcaPod = "",
                Confirmed = true,

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
                OrcaPod = "",
                Confirmed = true,
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
                OrcaPod = "",
                Confirmed = true,
            });

            Context.SaveChanges();
            var searchSighting = new SearchSightingRequestModel
            {
                SightedFrom = DateTime.Now.AddDays(-7),
                SightedTo = DateTime.Now.AddDays(-1),
            };

            // Act
            var result = await _underTest.SearchSighting(searchSighting, pageFilter);

            // Assert
            result.Should().HaveCount(1);
        }

        [Fact]
        public async void SearchSighting_CalledWithValidSightingRequestModelByDateRangeAndOrcaPod_ReturnsFilteredByDateRangeAndOrcaPodSightingResponseModel()
        {
            // Arrange
            var pageFilter = new PageFilter();

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
                OrcaPod = "",
                Confirmed = true,
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
                OrcaPod = "k",
                Confirmed = true,
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
                OrcaPod = "k",
                Confirmed = true,
            });

            Context.SaveChanges();
            var searchSighting = new SearchSightingRequestModel
            {
                SightedFrom = DateTime.Now.AddDays(-7),
                SightedTo = DateTime.Now.AddDays(-1),
                OrcaPod = "k"
            };

            // Act
            var result = await _underTest.SearchSighting(searchSighting, pageFilter);

            // Assert
            result.Should().HaveCount(2);
        }

        [Fact]
        public async void SearchSighting_CalledWithValidSightingRequestModelByLocation_ReturnsFilteredByLocationSightingResponseModel()
        {
            // Arrange
            var pageFilter = new PageFilter();

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
                OrcaPod = "",
                Confirmed = true,
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
                OrcaPod = "k",
                Confirmed = true,
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
                OrcaPod = "k",
                Confirmed = true,
            });

            Context.SaveChanges();
            var searchSighting = new SearchSightingRequestModel
            {
                Location = "pacific ocean"
            };

            // Act
            var result = await _underTest.SearchSighting(searchSighting, pageFilter);

            // Assert
            result.Should().HaveCount(1);
        }

        [Fact]
        public async Task GetNotConfirmedSightings_Called_UnconfirmedReturnsSightings()
        {
            // Arrange
            var pageFilter = new PageFilter();

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
            var result = await _underTest.GetNotConfirmedSightings(pageFilter);

            // Assert
            result.Should().HaveCount(2);
        }

        [Fact]
        public async Task GetNotConfirmedSightings_Called_UnconfirmedReturnsNull()
        {
            // Arrange
            var pageFilter = new PageFilter();
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
            var result = await _underTest.GetNotConfirmedSightings(pageFilter);

            // Assert
            result.Should().BeEmpty();
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
            var lat = 2.00;
            var lon = 2.00;

            var sighting = new SightingDbModel
            {
                Id = 1,
                Species = Species.AtlanticWhiteSidedDolphin,
                Quantity = 2,
                Description = "was nice",
                Longitude = lon,
                Latitude = lat,
                Location = "atlantic ocean",
                SightedAt = DateTime.Now,
                OrcaType = null,
                OrcaPod = "",
                Confirmed = true,
            };

            await Context.Sightings.AddAsync(sighting);
            await Context.SaveChangesAsync();

            // Act
            var result = await _underTest.GetSpeciesByCoordinates(lat, lon);

            // Assert
            result.Should().HaveCount(1);
            result.Should().Contain(Species.AtlanticWhiteSidedDolphin);
        }

        [Fact]
        public async void GetSpeciesByCoordinates_CalledWithValidLatLong_ReturnsEmptyList()
        {
            // Arrange
            var lat = 2.00;
            var lon = 2.00;

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

        [Fact]
        public async void GetUsersSightings_Returns_ListOfSightings()
        {
            // Arrange
            var pageFilter = new PageFilter();
            var currentUser = new UserDbModel
            {
                Id = "1",
                UserName = "ThisOne"
            };

            var otherUser = new UserDbModel
            {
                Id = "2",
                UserName = "Other"
            };

            var sightings = new List<SightingDbModel>
            {
                new SightingDbModel
                {
                    User = currentUser
                },
                new SightingDbModel
                {
                    User = currentUser
                },
                new SightingDbModel
                {
                    User = otherUser
                }
            };

            await Context.Sightings.AddRangeAsync(sightings);
            await Context.SaveChangesAsync();

            // Act
            var result = await _underTest.GetUserSightings(currentUser, pageFilter);

            // Assert
            result.Should().HaveCount(2);
            result[0].Username.Should().Be(currentUser.UserName);
        }

        [Fact]
        public async void GetUserSightingsCount_CalledWithUser_ReturnsCorrectCount()
        {
            // Arrange
            var user = new UserDbModel
            {
                UserName = "Hello",
                Sightings = new List<SightingDbModel>
                {
                    new SightingDbModel { Confirmed = true },
                    new SightingDbModel { Confirmed = true },
                    new SightingDbModel { Confirmed = true },
                }
            };

            var extraSighting = new SightingDbModel { Confirmed = true };

            await Context.Users.AddAsync(user);
            await Context.Sightings.AddAsync(extraSighting);
            await Context.SaveChangesAsync();

            // Act
            var result = _underTest.GetUserSightingsCount(user);

            // Assert
            result.Should().Be(3);
        }
    }
}