
using KoLaB.Models;
using Microsoft.EntityFrameworkCore;

namespace KoLaB.Context
{
    public class AppDBContext : DbContext
    {
        public AppDBContext(DbContextOptions<AppDBContext> options) : base(options)
        {

        }
        public DbSet<User> Users { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // modelBuilder.Entity<User>().ToTable("users");
    
            base.OnModelCreating(modelBuilder);
        }

    }
}

//using KoLaB.Models;
//using Microsoft.EntityFrameworkCore;

//namespace KoLaB.Context
//{
//    public class AppDbContext:DbContext
//    {
//        public AppDbContext(DbContextOptions<AppDbContext> options):base(options)
//        {

//        }
//        public DbSet<User> Users { get; set; }
//        protected override void OnModelCreating(ModelBuilder modelBuilder)
//        {
//            modelBuilder.Entity<User>().ToTable("users");
//           // base.OnModelCreating(modelBuilder);
//        }

//    }
//}
