using IdentityServer4.EntityFramework.Options;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace WhaleSpotting.Models.DbModels
{
    public class WhaleSpottingContext: ApiAuthorizationDbContext<UserDbModel>
    {
        public WhaleSpottingContext(
            DbContextOptions options,
            IOptions<OperationalStoreOptions> operationalStoreOptions) : base(options, operationalStoreOptions)
        {
        }
        public DbSet<SightingDbModel> Sightings { get; set; }
        public DbSet<GeographyDbModel> Geography { get; set; }

    }
}