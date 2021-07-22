using Microsoft.EntityFrameworkCore;

namespace WhaleSpotting.Models.DbModels
{
    public class WhaleSpottingContext: DbContext
    {
        public WhaleSpottingContext(DbContextOptions<WhaleSpottingContext> options) : base(options)
        {
        }
        
        public DbSet<TestDbModel> Test { get; set; }
    }
}