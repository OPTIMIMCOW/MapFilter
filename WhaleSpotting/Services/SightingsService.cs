using System.Collections.Generic;
using WhaleSpotting.Models.ApiModels;
using WhaleSpotting.Models.DbModels;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using WhaleSpotting.Models.RequestModels;
using WhaleSpotting.Models.Enums;

namespace WhaleSpotting.Services
{
    public interface ISightingsService
    {
        Task<List<SightingResponseModel>> GetSightings();
        string CreateSighting(SightingRequestModel sightingRequestModel);
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

        public string CreateSighting(SightingRequestModel sightingRequestModel)
        {

                var newSighting = new SightingDbModel()
                {
                    Species = (Species) sightingRequestModel.Species,
                    Name = addAnimalViewModel.Name,
                    Sex = addAnimalViewModel.Sex,
                    Dob = addAnimalViewModel.Dob,
                    DateAcquired = addAnimalViewModel.DateAcquired,
                    Enclosure = enclosure,
                    Keeper = keeper
                };

            _context.Sightings.Add(newSighting);
            _context.SaveChanges();
        }
    }
}