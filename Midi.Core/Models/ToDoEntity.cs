using System;

namespace Midi.Core.Models
{
    public class ToDoEntity : BaseEntity
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public bool Completed { get; set; }
        public DateTime? DueDate { get; set; }
    }
}
