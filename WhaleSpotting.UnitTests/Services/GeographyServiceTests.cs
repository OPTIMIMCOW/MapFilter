using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WhaleSpotting.Services;
using Xunit;
using WhaleSpotting.Models.DbModels;
using FluentAssertions;
using WhaleSpotting.Models.ResponseModels;

namespace WhaleSpotting.UnitTests.Services
{
    public class GeographyServiceTests: ServiceTestsBase
    {
        private readonly IGeographyService _underTest;

        public GeographyServiceTests()
        {
            _underTest = new GeographyService(Context);
        }

        [Fact]
        public void PostSampleGeographyData_CalledWithPopulateSampleDataEndpoint_ReturnGeographyResponseModelAndAddToDb()
        {
            //Arrange - none necessary

            //Act
            var result = _underTest.populateSampleData();

            //Assert
            result.Should().BeOfType<List<GeographyResponseModel>>();
            result.Should().HaveCount(85050);

            var dbModelAdditions = Context.Geography.ToList();
            dbModelAdditions.Should().HaveCount(85050);
        } 
    }
}
