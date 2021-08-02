using System;
using Microsoft.Extensions.Configuration;

namespace WhaleSpotting
{
    public static class ConfigurationHelper
    {
        public static string GetDbConnectionString(IConfiguration configuration)
        {
            if (Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") == "Development") {
                return configuration.GetValue<string>("DATABASE_URL");
            }

            if (string.IsNullOrEmpty(Environment.GetEnvironmentVariable("DATABASE_URL")))
            {
                throw new Exception("No environment variable set for DATABASE_URL");
            }

            var databaseUrl = Environment.GetEnvironmentVariable("DATABASE_URL");
            var uri = new Uri(databaseUrl!);
            var username = uri.UserInfo.Split(':')[0];
            var password = uri.UserInfo.Split(':')[1];
            var connectionString = "User ID=" + username +
                ";Password=" + password +
                ";Host=" + uri.Host +
                ";Port=" + uri.Port +
                ";Database=" + uri.AbsolutePath[1..] +
                ";Pooling=true;SSL Mode=Require;TrustServerCertificate=True;";
            Console.WriteLine(connectionString);
            return connectionString;
        }

        public static string GetIssuerUri(IConfiguration configuration)
        {
            if (Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") == "Development") {
                return configuration.GetValue<string>("ISSUER_URI");
            }

            if (string.IsNullOrEmpty(Environment.GetEnvironmentVariable("ISSUER_URI")))
            {
                throw new Exception("No environment variable set for DATABASE_URL");
            }

            return Environment.GetEnvironmentVariable("ISSUER_URI");
        }
    }
}
