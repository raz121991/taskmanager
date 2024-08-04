using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskManagement.Data;
using TaskManagement.DTO;
using TaskManagement.Models;

namespace TaskManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TasksController : ControllerBase
    {
        private readonly TaskContext _context;

        public TasksController(TaskContext context)
        {
            _context = context;

        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TaskItem>>> GetTasks()
        {
            return await _context.Tasks.ToListAsync();
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<TaskItem>> GetTaskItem(int id)
        {
            var taskItem = await _context.Tasks.FindAsync(id);

            if (taskItem == null)
            {
                return NotFound();
            }

            return taskItem;
        }

        // POST: api/Tasks
        [HttpPost]
        public async Task<ActionResult<TaskItem>> PostTaskItem(TaskItemDto taskItemDto)
        {
            TaskItem task = new TaskItem() { Title = taskItemDto.Title, Description = taskItemDto.Description, DueDate = DateTime.Now.Add(new TimeSpan(30)) };
           

            _context.Tasks.Add(task);
            try
            {

                await _context.SaveChangesAsync();
            }
            catch (Exception e)
            {
                return BadRequest("There was an issue saving the new task in DB: " + e.Message);
            }

            return CreatedAtAction(nameof(GetTaskItem), new { id = task.Id }, task);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutTaskItem( int id, TaskItemDto taskItemDto)
        {
            if (id != taskItemDto.Id)
            {
                return BadRequest("The id of the task item does not match the passed id");
            }

            var taskItemToUpdate = await _context.Tasks.FindAsync(id);
            if (taskItemToUpdate == null)
                return NotFound("Task not found");

            taskItemToUpdate.Title = taskItemDto.Title;
            taskItemToUpdate.Description = taskItemDto.Description;
            taskItemToUpdate.DueDate =  taskItemDto.DueDate != DateTime.MinValue ? taskItemDto.DueDate : taskItemToUpdate.DueDate;


            try
            {
                await _context.SaveChangesAsync();
            }
            catch (Exception e)
            {
                return BadRequest("There was an issue updating the resource: " + e.Message);
            }

            return Ok(taskItemToUpdate);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTaskItem(int id)
        {
            var taskItem = await _context.Tasks.FindAsync(id);
            if (taskItem == null)
            {
                return NotFound();
            }

            _context.Tasks.Remove(taskItem);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch(Exception e)
            {
                return BadRequest("There was an issue Deleting the task: " + e.Message);
            }
            return NoContent();
        }

      
    }
}
