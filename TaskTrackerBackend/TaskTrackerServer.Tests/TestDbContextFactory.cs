using Backend.Data;
using Backend.Models;
using Microsoft.EntityFrameworkCore;

public static class TestDbContextFactory
{
    public static AppDbContext Create(string? dbName = null)
    {
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(dbName ?? Guid.NewGuid().ToString())
            .Options;

        var context = new AppDbContext(options);
        context.Database.EnsureCreated();
        return context;
    }

    public static void Destroy(AppDbContext context)
    {
        context.Database.EnsureDeleted();
        context.Dispose();
    }

    public static TodoTask CreateTask(AppDbContext context, string title = "Test Task", TaskCompletion status = TaskCompletion.TODO)
    {
        var task = new TodoTask
        {
            Title = title,
            Status = status
        };

        context.Tasks.Add(task);
        context.SaveChanges();

        return task;
    }
}