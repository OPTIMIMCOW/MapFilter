using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using WhaleSpotting.Models.ApiModels;
using WhaleSpotting.Models.DbModels;

namespace WhaleSpotting.Services.Helpers
{
    public interface IJsonParser
    {
        List<SightingResponseModel> GetSightingsFromJson(string path);
    }

    public class JsonParser
    {

        private readonly WhaleSpottingContext _context;
        public JsonParser(WhaleSpottingContext context)
        {
            _context = context;
        }

        //private static readonly ILogger Logger = LogManager.GetCurrentClassLogger();

        public static List<SightingResponseModel> GetSightingsFromJson(string path)
        {
            try
            {
                var json = File.ReadAllText(path);
                //Logger.Info("The program has successfully read the file.");
                return JsonConvert.DeserializeObject<List<SightingResponseModel>>(json);
            }
            catch (Exception e)
            {
                //Logger.Error(e.Message);
                return new List<SightingResponseModel>();
            };
        }
    }
}
