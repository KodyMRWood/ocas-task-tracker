using Backend.Controllers;
using Backend.Models;
using Backend.Data;
using Microsoft.AspNetCore.Mvc;
using Xunit;

public class ValidationTests
{
    [Fact]
    public async Task CreateTask_ShouldReturnBadRequest_WhenTitleIsMissing()
    {
        // Arrange
        var context = TestDbContextFactory.Create();
        var controller = new TasksController(context);

        var invalidTask = new TodoTask { Title = "" };

        controller.ModelState.AddModelError("Title", "Required");

        // Act
        var result = await controller.CreateTask(invalidTask);

        // Assert
        Assert.IsType<BadRequestObjectResult>(result.Result);
    }

    [Fact]
    public async Task UpdateTask_ShouldReturnBadRequest_WhenModelStateInvalid()
    {
        var context = TestDbContextFactory.Create();
        var controller = new TasksController(context);

        var invalidTask = new TodoTask { Title = "a" }; // too short
        controller.ModelState.AddModelError("Title", "MinLength");

        var result = await controller.UpdateTask(1, invalidTask);

        Assert.IsType<BadRequestObjectResult>(result);
    }
}