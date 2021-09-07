using Microsoft.Extensions.DependencyInjection;
using Midi.Core.Interfaces.Managers;
using Midi.Managers;

namespace Microsoft.Extensions.DependencyInjection
{
    public static class Configuration
    {
        public static IServiceCollection AddManagers(this IServiceCollection services)
        {
            services.AddTransient<IToDoManager, ToDoManager>();
            // TODO: Additional managers get added here, mapping the interface to the implementation

            return services;
        }
    }
}