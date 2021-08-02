using FakeItEasy;
using IdentityServer4.EntityFramework.Options;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System.Data.Common;
using WhaleSpotting.Models.DbModels;

namespace WhaleSpotting.UnitTests.Services
{
    public class ServiceTestsBase
    {
        protected readonly WhaleSpottingContext Context;

        protected ServiceTestsBase()
        {
            Context = CreateDatabase();
        }

        private static WhaleSpottingContext CreateDatabase()
        {
            var context = new WhaleSpottingContext(
                new DbContextOptionsBuilder<WhaleSpottingContext>()
                    .UseSqlite(CreateInMemoryDatabase())
                    .Options, 
                A.Fake<IOptions<OperationalStoreOptions>>());
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