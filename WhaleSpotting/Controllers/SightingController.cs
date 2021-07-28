using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using WhaleSpotting.Models.ApiModels;

namespace WhaleSpotting.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SightingController : ControllerBase
    {
        [HttpGet]
        public IEnumerable<SightingsResponseModel> Get()
        {
            _sightings.GetSightingBy
        }



    //    public ActionResult Index()
    //    {
    //        IEnumerable<StudentViewModel> students = null;

    //        using (var client = new HttpClient())
    //        {
    //            client.BaseAddress = new Uri("http://localhost:64189/api/");
    //            //HTTP GET
    //            var responseTask = client.GetAsync("student");
    //            responseTask.Wait();

    //            var result = responseTask.Result;
    //            if (result.IsSuccessStatusCode)
    //            {
    //                var readTask = result.Content.ReadAsAsync<IList<StudentViewModel>>();
    //                readTask.Wait();

    //                students = readTask.Result;
    //            }
    //            else //web api sent error response 
    //            {
    //                //log response status here..

    //                students = Enumerable.Empty<StudentViewModel>();

    //                ModelState.AddModelError(string.Empty, "Server error. Please contact administrator.");
    //            }
    //        }
    //        return View(students);
    //    }
    //}
}
}