using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using System.Data.Common;
using WhaleSpotting.Models.DbModels;

namespace WhaleSpotting.UnitTests.Services
{
    public class BaseServiceTests
    {
        protected readonly WhaleSpottingContext Context;

        protected BaseServiceTests()
        {
            Context = CreateDatabase();
        }

        private static WhaleSpottingContext CreateDatabase()
        {
            var context = new WhaleSpottingContext(
                new DbContextOptionsBuilder<WhaleSpottingContext>()
                    .UseSqlite(CreateInMemoryDatabase())
                    .Options);
            context.Database.EnsureDeleted();
            context.Database.EnsureCreated();
            return context;
        }

        private static DbConnection CreateInMemoryDatabase()
        {
            var connection = new SqliteConnection("Filename=:memory:");

            connection.Open();

            return connection;
        }
    }
}