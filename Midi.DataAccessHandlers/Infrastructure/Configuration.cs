using Microsoft.EntityFrameworkCore;
using Midi.Core.Interfaces.DataAccessHandlers;
using Midi.DataAccessHandlers;
using Midi.DataAccessHandlers.Infrastructure;

namespace Microsoft.Extensions.DependencyInjection
{
    public static class Configuration
    {
        public static IServiceCollection AddDataAccessHandlers(this IServiceCollection services, string connectionString)
        {
            services.AddScoped<MidiContext>();
            services.AddDbContext<MidiContext>(options => options.UseSqlServer(connectionString));

            services.AddTransient<IToDoHandler, ToDoHandler>();
            // TODO: Addtional handlers get added here, mapping the interface to the implementation

            return services;
        }
    }
}
 