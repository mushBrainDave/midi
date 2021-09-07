using System;
using System.Collections.Generic;
using System.Text;
using Midi.Core.Interfaces.DataAccessHandlers;
using Midi.Core.Models;
using Midi.DataAccessHandlers.Infrastructure;

namespace Midi.DataAccessHandlers
{
    public class ToDoHandler : BaseHandler<ToDoEntity>, IToDoHandler
    {
        public ToDoHandler(MidiContext context) : base(context)
        {
        }

        // TODO: Additional custom methods get implemented here
    }
}
