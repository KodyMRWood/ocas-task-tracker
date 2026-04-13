using Microsoft.AspNetCore.Mvc;
using Backend.Data;
using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TasksController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TasksController(AppDbContext context)
        {
            _context = context;
        }

        // Post new task to server
        [HttpPost]
        public async Task<ActionResult<TodoTask>> CreateTask(TodoTask task)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            _context.Tasks.Add(task);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetTask), new { id = task.Id }, task);
        }

        // Get all tasks
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TodoTask>>> GetTasks() => Ok(await _context.Tasks.ToListAsync());

        // Get on speicfic task based on the ID
        [HttpGet("{id}")]
        public async Task<ActionResult<TodoTask>> GetTask(int id)
        {
            var task = await _context.Tasks.FindAsync(id);
            if (task == null)
            {
                return NotFound();
            }

            return Ok(task);
        }

        // Put, update existing task
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTask(int id, TodoTask updated)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var task = await _context.Tasks.FindAsync(id);
            if (task == null) return NotFound();

            // If we do not want the task to be able to go back to open
            // However in an agile workplace, this could cause problems
            // if (task.Status == TaskCompletion.DONE && updated.Status != TaskCompletion.DONE)
            // {
            //     return BadRequest("Cannot transition task status backward from DONE.");
            // }

            // if (task.Status == TaskCompletion.INPROGRESS && updated.Status == TaskCompletion.TODO)
            // {
            //     return BadRequest("Cannot transition task status backward.");
            // }

            //Business rule. the task can not be completed if the title is empty or white space
            if (updated.Status == TaskCompletion.DONE && string.IsNullOrWhiteSpace(updated.Title))
            {
                return BadRequest("Cannot mark a task as DONE when the title is empty.");
            }

            task.Title = updated.Title;
            task.Status = updated.Status;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        // Delete existing task
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTask(int id)
        {
            var task = await _context.Tasks.FindAsync(id);
            if (task == null) return NotFound();

            _context.Tasks.Remove(task);
            await _context.SaveChangesAsync();
            return NoContent();
        }


    }
}