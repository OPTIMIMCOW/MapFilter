using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using WhaleSpotting.Models.ApiModels;


namespace WhaleSpotting.Services.Helpers
{
    public class JsonParser
    {
        //private static readonly ILogger Logger = LogManager.GetCurrentClassLogger();

        public static List<SightingResponseModel> GetTransactionsFromJson(string path)
        {
            try
            {
                var json = File.ReadAllText("http://hotline.whalemuseum.org/api.json");
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
