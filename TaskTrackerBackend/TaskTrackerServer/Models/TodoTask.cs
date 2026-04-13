using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public enum TaskCompletion
    {
        TODO = 0,
        INPROGRESS = 1,
        DONE = 2,
    }

    public class TodoTask
    {
        public int Id { get; set; }
        [Required]
        [MaxLength(100)]
        public string? Title { get; set; } = "";
        public string? Description { get; set; } = "";

        public DateTime? DueDate { get; set; } = new DateTime();

        public TaskCompletion? Status { get; set; } = TaskCompletion.TODO;
    }
}