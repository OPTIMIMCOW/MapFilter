using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WhaleSpotting.Controllers
{
    [Route("/geography")]
    public class GeographyController : Controller
    {
        [HttpPost]
        public IActionResult PopulateSampleData()
        {
            
            return Ok();
        }
    }
}
