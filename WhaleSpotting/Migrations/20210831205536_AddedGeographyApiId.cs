using Microsoft.EntityFrameworkCore.Migrations;

namespace WhaleSpotting.Migrations
{
    public partial class AddedGeographyApiId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ApiId",
                table: "Geography",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ApiId",
                table: "Geography");
        }
    }
}
