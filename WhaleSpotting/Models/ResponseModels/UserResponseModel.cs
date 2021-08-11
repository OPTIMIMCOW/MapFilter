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
