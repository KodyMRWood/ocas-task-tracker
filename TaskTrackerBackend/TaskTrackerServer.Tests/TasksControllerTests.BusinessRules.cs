using Backend.Controllers;
using Backend.Models;
using Backend.Data;
using Microsoft.AspNetCore.Mvc;
using Xunit;
public class BusinessRuleTests
{
    [Fact]
    public async Task UpdateTask_ShouldReject_UncompleteTransition()
    {
        // Arrange
        var context = TestDbContextFactory.Create();
        var controller = new TasksController(context);

        var task = new TodoTask { Title = "Test", Status = Backend.Models.TaskCompletion.DONE };
        context.Tasks.Add(task);
        await context.SaveChangesAsync();

        var updated = new TodoTask { Title = "Test", Status = Backend.Models.TaskCompletion.TODO };

        // Act
        var result = await controller.UpdateTask(task.Id, updated);

        // Assert
        Assert.IsType<BadRequestObjectResult>(result);
    }

    [Theory]
    [InlineData("")]
    [InlineData(" ")]
    [InlineData(null)]
    public async Task UpdateTask_ShouldReject_CannotBeDoneIfTitleEmptyOrWhitespace(string? title)
    {
        // Arrange
        var context = TestDbContextFactory.Create();
        var controller = new TasksController(context);

        var task = new TodoTask { Title = "Test", Status = Backend.Models.TaskCompletion.TODO };
        context.Tasks.Add(task);
        await context.SaveChangesAsync();

        var updated = new TodoTask { Title = title, Status = Backend.Models.TaskCompletion.DONE };

        // Act
        var result = await controller.UpdateTask(task.Id, updated);

        // Assert
        Assert.IsType<BadRequestObjectResult>(result);
    }
}