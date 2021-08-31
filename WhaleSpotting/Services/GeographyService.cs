using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WhaleSpotting.Models.DbModels;
using WhaleSpotting.Models.ResponseModels;
using WhaleSpotting.Models.RequestModels;
using WhaleSpotting.Models.Enums;
using Microsoft.EntityFrameworkCore;

namespace WhaleSpotting.Services
{
    public interface IGeographyService
    {
        List<GeographyResponseModel> populateSampleData();
        Task<BatchGeographyResponseModel> GetBatchGeography(BatchGeographyRequestModel batchGeography);
    }

    public class GeographyService : IGeographyService
    {
        public WhaleSpottingContext _context;
        public GeographyService(WhaleSpottingContext context)
        {
            _context = context;
        }

        public List<GeographyResponseModel> populateSampleData()
        {
            var newPoints = generateSampleData();
            var existingPointApiIds = _context.Geography.Select(g => g.ApiId).ToList();
            var pointsToAdd = newPoints.Where(g => !existingPointApiIds.Contains(g.ApiId)).ToList();

            _context.Geography.AddRange(pointsToAdd);
            _context.SaveChanges();

            return pointsToAdd.Select(g => new GeographyResponseModel(g)).ToList();
        }

        public List<GeographyDbModel> generateSampleData()
        {
            var geographyPoints = new List<GeographyDbModel>();
            Int32 id = 0;

            for (int i = -180; i < 180; i++)
            {
                for (int j = -90; j < 90; j++)
                {
                    geographyPoints.Add(new GeographyDbModel(id, j, i, AttractionType.Beach.ToString())); ;
                    id++;
                }
            }

            for (int i = -180; i < 180; i+=2)
            {
                for (int j = -90; j < 90; j+=2)
                {
                    geographyPoints.Add(new GeographyDbModel(id, j, i, AttractionType.Hiking.ToString())); ;
                    id++;
                }
            }

            for (int i = -180; i < 180; i += 4)
            {
                for (int j = -90; j < 90; j += 4)
                {
                    geographyPoints.Add(new GeographyDbModel(id, j, i, AttractionType.History.ToString()));
                    id++;
                }
            }

            return geographyPoints;
        }

        public async Task<BatchGeographyResponseModel> GetBatchGeography(BatchGeographyRequestModel batchGeography)
        {
            var upperLatitude = batchGeography.maxLatitude;
            var lowerLatitude = batchGeography.minLatitude;

            var geography = _context.Geography
                .Where(g => g.Latitude > lowerLatitude && g.Latitude < upperLatitude)
                .Select(g => new GeographyResponseModel(g))
                .ToList();

            
            return new BatchGeographyResponseModel(batchGeography.batchNumber, geography);
        }
    }
}
