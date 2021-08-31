using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WhaleSpotting.Models.DbModels;
using WhaleSpotting.Models.ResponseModels;
using WhaleSpotting.Models.Enums;


namespace WhaleSpotting.Services
{
    public interface IGeographyService
    {
        List<GeographyResponseModel> populateSampleData();
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
            var existingPointIds = _context.Geography.Select(g => g.Id).ToList();
            var pointsToAdd = newPoints.Where(g => !existingPointIds.Contains(g.Id)).ToList();

            _context.Geography.AddRange(pointsToAdd);
            _context.SaveChanges();

            return pointsToAdd.Select(g => new GeographyResponseModel(g)).ToList();
        }

        public List<GeographyDbModel> generateSampleData()
        {
            var geographyPoints = new List<GeographyDbModel>();
            Int32 id = 0;

            for (int i = 0; i < 360; i++)
            {
                for (int j = 0; j < 180; j++)
                {
                    geographyPoints.Add(new GeographyDbModel(id, j, i, AttractionType.Beach.ToString())); ;
                    id++;
                }
            }

            for (int i = 0; i < 360; i+=2)
            {
                for (int j = 0; j < 180; j+=2)
                {
                    geographyPoints.Add(new GeographyDbModel(id, j, i, AttractionType.Hiking.ToString())); ;
                    id++;
                }
            }

            for (int i = 0; i < 360; i += 4)
            {
                for (int j = 0; j < 180; j += 4)
                {
                    geographyPoints.Add(new GeographyDbModel(id, j, i, AttractionType.History.ToString()));
                    id++;
                }
            }

            return geographyPoints;
        }
    }
}
