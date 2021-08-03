using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using WhaleSpotting.Models.DbModels;

namespace WhaleSpotting.Data
{
    public class ApiData
    {

        //Define your static method which will make the method become part of the class
        //Also make it asynchronous meaning it is retrieving data from a api.
        //Have it void since your are logging the result into the console.
        //Which would take a integar as a argument.
        public static async void GetApiData()
        {
            //Define your base url
            string baseURL = $"http://hotline.whalemuseum.org/api.json";
            //Have your api call in try/catch block.
            try
            {
                //Now we will have our using directives which would have a HttpClient 
                using (HttpClient client = new HttpClient())
                {
                    //Now get your response from the client from get request to baseurl.
                    //Use the await keyword since the get request is asynchronous, and want it run before next asychronous operation.
                    using (HttpResponseMessage res = await client.GetAsync(baseURL))
                    {
                        //Now we will retrieve content from our response, which would be HttpContent, retrieve from the response Content property.
                        using (HttpContent content = res.Content)
                        {
                            //Retrieve the data from the content of the response, have the await keyword since it is asynchronous.
                            string data = await content.ReadAsStringAsync();
                            //If the data is not null, parse the data to a C# object, then create a new instance of PokeItem.
                            
                            var sightings = JsonConvert.DeserializeObject<List<SightingDbModel>>(data);

                            if (data != null)
                            {
                                //Parse your data into a object.
                                var dataObj = JObject.Parse(data);
                                foreach (var pair in dataObj)
                                {
                                    Console.WriteLine("{0}: {1}", pair.Key, pair.Value);
                                }
                                //Then create a new instance of PokeItem, and string interpolate your name property to your JSON object.
                                //Which will convert it to a string, since each property value is a instance of JToken.
                                //List<SightingDbModel> sightings = new SightingDbModel(name: $"{dataObj["name"]}");
                                //Log your pokeItem's name to the Console.

                            }
                            else
                            {
                                //If data is null log it into console.
                                Console.WriteLine("Data is null!");
                            }
                        }
                    }
                }
                //Catch any exceptions and log it into the console.
            }
            catch (Exception exception)
            {
                Console.WriteLine(exception);
            }
        }
    }
}    
