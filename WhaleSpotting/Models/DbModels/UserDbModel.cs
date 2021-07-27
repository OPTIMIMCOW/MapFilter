using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;

namespace WhaleSpotting.Models.DbModels
{
    [Table("Users")]
    public class UserDbModel : IdentityUser
    {
        public int Id { get; set; } // id 'hides' - check w/ Oskar
        public string Username { get; set; }
        public string Password { get; set; }
        public string ProfileImageUrl { get; set; }
        public string Role { get; set; } //alternate option - ENUM / Bool
    }
}
