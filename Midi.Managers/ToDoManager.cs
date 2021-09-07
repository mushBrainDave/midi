using System;
using System.Collections.Generic;
using System.Text;
using Midi.Core.Interfaces.Engines;
using Midi.Core.Interfaces.Managers;
using Midi.Core.Models;

namespace Midi.Managers
{
    public class ToDoManager : IToDoManager
    {
        private readonly IToDoEngine _toDoEngine;
        public ToDoManager(IToDoEngine toDoEngine)
        {
            _toDoEngine = toDoEngine;
        }

        public ToDoEntity AddNewToDo(string title, string description, DateTime? dueDate = null)
        {
            return _toDoEngine.CreateToDoEntity(title, description, dueDate);
        }

        public IEnumerable<ToDoEntity> GetToDos()
        {
            return _toDoEngine.GetToDos();
        }

        public ToDoEntity UpdateDueDate(int id, DateTime? dueDate = null)
        {
            var entity = _toDoEngine.GetToDo(id);
            return _toDoEngine.UpdateDueDate(entity, dueDate);
        }
    }
}
