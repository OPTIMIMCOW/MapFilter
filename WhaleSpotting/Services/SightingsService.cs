using System.Collections.Generic;
using WhaleSpotting.Models.ApiModels;
using WhaleSpotting.Models.DbModels;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace WhaleSpotting.Services
{
    public interface ISightingService
    {
        Task<List<SightingResponseModel>> GetSightings();
    }

    public class SightingsService : ISightingService
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
    }
}