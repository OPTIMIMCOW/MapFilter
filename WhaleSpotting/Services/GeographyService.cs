using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WhaleSpotting.Models.DbModels;
using WhaleSpotting.Models.ResponseModels;
using WhaleSpotting.Models.RequestModels;
using WhaleSpotting.Models.Enums;
using Microsoft.EntityFrameworkCore;
using GeoCoordinatePortable;

namespace WhaleSpotting.Services
{
    public interface IGeographyService
    {
        List<GeographyResponseModel> populateSampleData();
        List<GeographyResponseModel> populateRandomSampleData(int total);
        BatchGeographyResponseModel GetBatchGeography(BatchGeographyRequestModel batchGeography);
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

            for (int i = -180; i < 180; i += 10)
            {
                for (int j = -90; j < 90; j += 10)
                {
                    geographyPoints.Add(new GeographyDbModel(id, j, i, AttractionType.Beach.ToString())); ;
                    id++;
                }
            }

            for (int i = -180; i < 180; i += 20)
            {
                for (int j = -90; j < 90; j += 20)
                {
                    geographyPoints.Add(new GeographyDbModel(id, j, i + 2, AttractionType.Hiking.ToString())); ;
                    id++;
                }
            }

            for (int i = -180; i < 180; i += 40)
            {
                for (int j = -90; j < 90; j += 40)
                {
                    geographyPoints.Add(new GeographyDbModel(id, j, i + 4, AttractionType.History.ToString()));
                    id++;
                }
            }
            return geographyPoints;
        }
        public List<GeographyResponseModel> populateRandomSampleData(int total)
        {
            var newPoints = new List<GeographyDbModel>();
            Int32 id = 1;

            for (int i = 0; i < total; i++)
            {
                var latitude = -90 + new Random().NextDouble() * 180;
                var longitude = -180 + new Random().NextDouble() * 360;
                var attraction = (AttractionType)new Random().Next(1, 5);
                newPoints.Add(new GeographyDbModel(id, latitude, longitude, attraction.ToString())); ;
                id++;
            }

            var existingPointApiIds = _context.Geography.Select(g => g.ApiId).ToList();
            var pointsToAdd = newPoints.Where(g => !existingPointApiIds.Contains(g.ApiId)).ToList();

            _context.Geography.AddRange(pointsToAdd);
            _context.SaveChanges();

            return pointsToAdd.Select(g => new GeographyResponseModel(g)).ToList();
        }

        public BatchGeographyResponseModel GetBatchGeography(BatchGeographyRequestModel batchGeography)
        {
            var attraction1 = new List<GeographyResponseModel>();
            var attraction2 = new List<GeographyResponseModel>();
            var attraction3 = new List<GeographyResponseModel>();

            if (batchGeography.Attraction1 != null)
            {
                attraction1 = getFilteredGeography(batchGeography, ((AttractionType)batchGeography.Attraction1).ToString());

                if (batchGeography.Attraction2 != null)
                {
                    attraction2 = getFilteredGeography(batchGeography, ((AttractionType)batchGeography.Attraction2).ToString());
                }

                if (batchGeography.Attraction3 != null)
                {
                    attraction3 = getFilteredGeography(batchGeography, ((AttractionType)batchGeography.Attraction3).ToString());
                }

                if (batchGeography.Distance12 != null)
                {
                    attraction1 = attraction1
                        .Where(g => checkSeparation(g, attraction2, (int)batchGeography.Distance12) == true)
                        .ToList();

                    attraction2 = attraction2
                        .Where(g => checkSeparation(g, attraction1, (int)batchGeography.Distance12) == true)
                        .ToList();
                }

                if (batchGeography.Distance13 != null)
                {
                    attraction1 = attraction1
                        .Where(g => checkSeparation(g, attraction3, (int)batchGeography.Distance13) == true)
                        .ToList();

                    attraction3 = attraction3
                        .Where(g => checkSeparation(g, attraction1, (int)batchGeography.Distance13) == true)
                        .ToList();

                    attraction2 = attraction2
                        .Where(g => checkSeparation(g, attraction1, (int)batchGeography.Distance12) == true)
                        .ToList();
                }
            }

            var geography = attraction1.Concat(attraction2).Concat(attraction3).ToList();

            return new BatchGeographyResponseModel(batchGeography.BatchNumber, geography);
        }

        public List<GeographyResponseModel> getFilteredGeography(BatchGeographyRequestModel batchGeography, string attractionType)
        {
            var upperLatitude = batchGeography.MaxLatitude + 5;
            var lowerLatitude = batchGeography.MinLatitude - 5;

            var upperLongitude = batchGeography.MaxLongitude + 5;
            var lowerLongitude = batchGeography.MinLongitude - 5;

            var geography = _context.Geography
                .Where(g => g.AttractionType == attractionType)
                .Where(g => g.Latitude > lowerLatitude && g.Latitude < upperLatitude)
                .Where(g => g.Longitude > lowerLongitude && g.Longitude < upperLongitude)
                .Select(g => new GeographyResponseModel(g))
                .ToList();

            return geography;
        }

        public bool checkSeparation(GeographyResponseModel start, List<GeographyResponseModel> end, int distance)
        {
            var distanceMeters = distance * 1000;
            var sLatitude = start.Latitude;
            var sLongitude = start.Longitude;
            var sCoord = new GeoCoordinate(sLatitude, sLongitude);

            var found = false;
            for (int i = 0; i < end.Count; i++)
            {
                var eLatitude = end[i].Latitude;
                var eLongitude = end[i].Longitude;
                var eCoord = new GeoCoordinate(eLatitude, eLongitude);

                var separation = (int)Math.Floor(sCoord.GetDistanceTo(eCoord));
                if (separation < distanceMeters)
                {
                    found = true;
                    break;
                }
            }
            return found;
        }
    }
}
