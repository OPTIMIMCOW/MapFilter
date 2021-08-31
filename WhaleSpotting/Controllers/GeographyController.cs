using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WhaleSpotting.Services;

namespace WhaleSpotting.Controllers
{
    [Route("/geography")]
    public class GeographyController : ControllerBase
    {
        private readonly IGeographyService _service;
        public GeographyController(IGeographyService service)
        {
            _service = service;
        }

        [HttpPost]
        public IActionResult PopulateSampleData()
        {
            _service.populateSampleData();
            return Ok();
        }
    }
}
