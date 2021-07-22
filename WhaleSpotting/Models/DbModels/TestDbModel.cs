using System.ComponentModel.DataAnnotations.Schema;

namespace WhaleSpotting.Models.DbModels
{
    [Table("Tests")]
    public class TestDbModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
}