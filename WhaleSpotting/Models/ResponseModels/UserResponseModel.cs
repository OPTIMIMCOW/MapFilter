using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WhaleSpotting.Models.DbModels;

namespace WhaleSpotting.Models.ResponseModels
{
    public class UserResponseModel
    {
        public string Username { get; set; }

        public UserResponseModel(UserDbModel user)
        {
            Username = user.UserName;
        }
    }
}
