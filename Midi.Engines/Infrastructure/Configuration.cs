using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.Extensions.DependencyInjection;
using Midi.Core.Interfaces.Engines;
using Midi.Engines;

namespace Microsoft.Extensions.DependencyInjection
{
    public static class Configuration
    {
        public static IServiceCollection AddEngines(this IServiceCollection services)
        {
            services.AddTransient<IToDoEngine, ToDoEngine>();
            // TODO: Additional engines get added here, mapping the interface to the implementation

            return services;
        }
    }
}
