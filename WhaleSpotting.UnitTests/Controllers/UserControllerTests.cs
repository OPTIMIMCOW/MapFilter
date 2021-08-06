using FakeItEasy;
using FluentAssertions;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using WhaleSpotting.Controllers;
using WhaleSpotting.Models.DbModels;
using WhaleSpotting.Models.Enums;
using WhaleSpotting.Models.RequestModels;
using WhaleSpotting.Models.ResponseModels;
using WhaleSpotting.Services;
using Xunit;

namespace WhaleSpotting.UnitTests.Controllers
{
    public class UserControllerTests
    {
        private readonly UserController _underTest;
        private readonly SignInManager<UserDbModel> _signInManager = A.Fake<SignInManager<UserDbModel>>();
        private readonly UserManager<UserDbModel> _userManager = A.Fake<UserManager<UserDbModel>>();
        private readonly RoleManager<IdentityRole> _roleManager = A.Fake<RoleManager<IdentityRole>>();

        public UserControllerTests()
        {
            _underTest = new UserController(_roleManager, _signInManager, _userManager);
        }

        [Fact]
        public async Task MakeAdmin_Called_UserHasRoles ()
        {
            // Arrange
            var user = A.Fake<UserDbModel>();
            A.CallTo(() => _underTest.MakeAdmin());
            _userManager.GetRolesAsync(user).Any().Returns(true);

            // Act
            var result = await _underTest.GetInfo();

            // Assert
            result.Should().HaveCount(2);
        }
    }
}