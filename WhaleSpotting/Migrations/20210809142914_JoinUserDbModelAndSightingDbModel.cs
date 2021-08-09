using Microsoft.EntityFrameworkCore.Migrations;

namespace WhaleSpotting.Migrations
{
    public partial class JoinUserDbModelAndSightingDbModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "Sightings",
                type: "text",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Sightings_UserId",
                table: "Sightings",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Sightings_AspNetUsers_UserId",
                table: "Sightings",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Sightings_AspNetUsers_UserId",
                table: "Sightings");

            migrationBuilder.DropIndex(
                name: "IX_Sightings_UserId",
                table: "Sightings");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Sightings");
        }
    }
}
