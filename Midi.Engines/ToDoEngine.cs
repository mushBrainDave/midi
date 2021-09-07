using System;
using System.Collections.Generic;
using System.Text;
using Midi.Core.Interfaces.DataAccessHandlers;
using Midi.Core.Interfaces.Engines;
using Midi.Core.Models;

namespace Midi.Engines
{
    public class ToDoEngine : IToDoEngine
    {
        private readonly IToDoHandler _toDoHandler;
        public ToDoEngine(IToDoHandler toDoHandler)
        {
            _toDoHandler = toDoHandler;
        }

        public ToDoEntity CreateToDoEntity(string title, string description, DateTime? dueDate = null)
        {
            var todo = new ToDoEntity
            {
                Title = title,
                Description = description,
                DueDate = dueDate
            };
            _toDoHandler.Insert(todo);
            _toDoHandler.SaveChanges();
            return todo;
        }

        public ToDoEntity GetToDo(int id)
        {
            var todo = _toDoHandler.GetById(id);
            return todo;
        }

        public IEnumerable<ToDoEntity> GetToDos()
        {
            return _toDoHandler.GetAll();
        }

        public ToDoEntity UpdateDueDate(ToDoEntity entity, DateTime? dueDate = null)
        {
            entity.DueDate = dueDate;
            _toDoHandler.Update(entity);
            _toDoHandler.SaveChanges();
            return entity;
        }
    }
}
