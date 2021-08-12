using WhaleSpotting.Models.DbModels;

namespace WhaleSpotting.Models.ResponseModels
{
    public class UserResponseModel
    {
        public string Username { get; set; }
        public int SightingsCount { get; set; }

        public UserResponseModel(UserDbModel user, int sightingsCount)
        {
            Username = user.UserName;
            SightingsCount = sightingsCount;
        }
    }
}
