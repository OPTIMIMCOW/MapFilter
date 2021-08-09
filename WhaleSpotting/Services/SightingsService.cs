using System.Collections.Generic;
using WhaleSpotting.Models.DbModels;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using WhaleSpotting.Models.RequestModels;
using System;
using WhaleSpotting.Models.ResponseModels;

namespace WhaleSpotting.Services
{
    public interface ISightingsService
    {
        Task<List<SightingResponseModel>> GetSightings();
        Task<List<SightingResponseModel>> SearchSighting(SearchSightingRequestModel searchSightingRequestModel);
        SightingResponseModel CreateSighting(SightingRequestModel sightingRequestModel);
        Task<SightingResponseModel> ConfirmSighting(int id);
        Task<List<SightingResponseModel>> GetNotConfirmedSightings();
        Task<SightingResponseModel> DeleteSighting(int id);
        List<SightingResponseModel> CreateSightings(List<SightingDbModel> sightingsToAdd);
    }

    public class SightingsService : ISightingsService
    {
        private readonly WhaleSpottingContext _context;

        public SightingsService(WhaleSpottingContext context)
        {
            _context = context;
        }

        public async Task<List<SightingResponseModel>> GetSightings()
        {
            var sightings = await _context.Sightings
                .OrderBy(s => s.SightedAt)
                .Select(s => new SightingResponseModel(s))
                .ToListAsync();

            return sightings;
        }

        public async Task<List<SightingResponseModel>> SearchSighting(SearchSightingRequestModel searchSighting)
        {
            var sightings = await _context.Sightings
                .Where(s => searchSighting.Species == null || s.Species == searchSighting.Species)
                .Where(s => searchSighting.SightedFrom == null || s.SightedAt >= searchSighting.SightedFrom)
                .Where(s => searchSighting.SightedTo == null || s.SightedAt <= searchSighting.SightedTo)
                .Where(s => searchSighting.OrcaPod == null || s.OrcaPod == searchSighting.OrcaPod)
                .Where(s => searchSighting.Location == null || s.Location == searchSighting.Location)
                .OrderBy(s => s.SightedAt)
                .Select(s => new SightingResponseModel(s))
                .ToListAsync();

            return sightings;
        }

        public List<SightingResponseModel> CreateSightings(List<SightingDbModel> sightingsToAdd)
        {
            var newSightingIds = sightingsToAdd.Select(s => s.ApiId).Distinct();
           
            var sightingsInDbIds = _context.Sightings
                .Where(s => newSightingIds.Contains(s.ApiId))
                .Select(s => s.ApiId);
           
            var sightingsNotInDb = sightingsToAdd
                .Where(s => !sightingsInDbIds.Contains(s.ApiId))
                .ToList();
           
            _context.Sightings.AddRange(sightingsNotInDb);
            _context.SaveChanges();
           
            return sightingsNotInDb.Select(s => new SightingResponseModel(s)).ToList();
        }

        public SightingResponseModel CreateSighting(SightingRequestModel sightingRequestModel)
        {
            if (sightingRequestModel.SightedAt > DateTime.Now)
            {
                throw new Exception("Sighted At must be in the past");
            }

            var newSighting = new SightingDbModel
            {
                Species = sightingRequestModel.Species,
                Quantity = sightingRequestModel.Quantity,
                Description = sightingRequestModel.Description,
                Longitude = sightingRequestModel.Longitude,
                Latitude = sightingRequestModel.Latitude,
                Location = sightingRequestModel.Location,
                SightedAt = sightingRequestModel.SightedAt,
                CreatedAt = DateTime.Now,
                UpdatedAt = DateTime.Now,
                OrcaType = sightingRequestModel.OrcaType,
                OrcaPod = sightingRequestModel.OrcaPod,
                Confirmed = false,
                // TO DO - add User
            };

            _context.Sightings.Add(newSighting);
            _context.SaveChanges();

            return new SightingResponseModel(newSighting);
        }

        public async Task<SightingResponseModel> ConfirmSighting(int id)
        {
            var sighting = await _context.Sightings
                .SingleOrDefaultAsync(s => s.Id == id);

            if (sighting == null)
            {
                return null;
            }

            sighting.Confirmed = true;
            _context.SaveChanges();

            return new SightingResponseModel(sighting);
        }

        public async Task<List<SightingResponseModel>> GetNotConfirmedSightings()
        {
            var sightings = await _context.Sightings
                .Where(s => s.Confirmed == false)
                .OrderBy(s => s.SightedAt)
                .Select(s => new SightingResponseModel(s))
                .ToListAsync();

            return sightings;
        }

        public async Task<SightingResponseModel> DeleteSighting(int id)
        {
            var sighting = await _context.Sightings
                .SingleOrDefaultAsync(s => s.Id == id);

            if (sighting == null)
            {
                return null;
            }

            _context.Sightings.Remove(sighting);
            _context.SaveChanges();

            return new SightingResponseModel(sighting);
        }
    }
}