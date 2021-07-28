using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WhaleSpotting.Models.ApiModels;
using WhaleSpotting.Models.DbModels;

namespace WhaleSpotting.Services
{
    public interface ISightingsServices
    {
        IEnumerable<SightingResponseModel> GetSightings();
    }

    public class SightingsService : ISightingsServices
    {
        public WhaleSpottingContext _context;

        public SightingsService(WhaleSpottingContext context)
        {
            _context = context;
        }

        public IEnumerable<SightingResponseModel> GetSightings ()
        {

        }
    }
}
