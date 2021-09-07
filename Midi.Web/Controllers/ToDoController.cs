using Microsoft.AspNetCore.Mvc;
using Midi.Core.Interfaces.Managers;

namespace Midi.Web.Controllers
{
    [Route("api/todos")]
    public class ToDoController : Controller
    {
        private readonly IToDoManager _toDoManager;
        public ToDoController(IToDoManager toDoManager)
        {
            _toDoManager = toDoManager;
        }

        [HttpGet]
        public IActionResult GetToDos()
        {
            return Json(_toDoManager.GetToDos());
        }
        
    }
}
