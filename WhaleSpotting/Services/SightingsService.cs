using System.Collections.Generic;
using WhaleSpotting.Models.ApiModels;
using WhaleSpotting.Models.DbModels;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace WhaleSpotting.Services
{
    public interface ISightingsService
    {
        Task<List<SightingResponseModel>> GetSightings();
        void AddNewSightings(List<SightingDbModel> sightingsToAdd);
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

        public void AddNewSightings(List<SightingDbModel> sightingsToAdd)
        {
            var newSightingIds =
                sightingsToAdd.Select(s => s.ApiId).Distinct().ToArray();
            var SightingsInDb =
                _context
                    .Sightings
                    .Where(s => newSightingIds.Contains(s.ApiId))
                    .Select(s => s.ApiId)
                    .ToArray();
            var SightingsNotInDb =
                sightingsToAdd.Where(s => !SightingsInDb.Contains(s.ApiId));
            SightingsNotInDb
                .ToList();
      
            _context.Sightings.AddRange(SightingsNotInDb.ToArray());
            _context.SaveChanges();
        }
    }
}