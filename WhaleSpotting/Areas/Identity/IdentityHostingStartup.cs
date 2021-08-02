using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using WhaleSpotting.Models.DbModels;
using Microsoft.Extensions.Configuration;

[assembly: HostingStartup(typeof(WhaleSpotting.Areas.Identity.IdentityHostingStartup))]
namespace WhaleSpotting.Areas.Identity
{
    public class IdentityHostingStartup : IHostingStartup
    {
        public void Configure(IWebHostBuilder builder)
        {
            var configuration = new ConfigurationBuilder()
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddJsonFile("appsettings.Development.json", optional: false, reloadOnChange: true)
                .AddEnvironmentVariables()
                .Build();

            var connectionString = ConnectionStringHelper.GetConnectionString(configuration);
            builder.ConfigureServices((context, services) => {
                services.AddDbContext<WhaleSpottingContext>(options =>
                    options
                         .UseNpgsql(connectionString));

                services.AddDefaultIdentity<UserDbModel>()
                    .AddEntityFrameworkStores<WhaleSpottingContext>();
            });
        }
    }
}