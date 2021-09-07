using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualBasic.CompilerServices;
using Midi.Core.Models;

namespace Midi.DataAccessHandlers.Infrastructure
{
    public class MidiContext : DbContext
    {
        public MidiContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<ToDoEntity> ToDos { get;set; }
        // TODO: Additonal DbSets go here

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ToDoEntity>()
                .HasKey(t => t.Id);
            // TODO: Configure your models here
        }
    }
}
