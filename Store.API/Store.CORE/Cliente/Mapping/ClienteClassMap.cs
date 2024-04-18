using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Store.DOMAIN.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Store.CORE.Mapping
{
    public class ClienteClassMap : IEntityTypeConfiguration<Cliente>
    {
        public void Configure(EntityTypeBuilder<Cliente> builder)
        {
            builder.ToTable("Cliente");
            builder.HasKey(x => x.IdCliente);

            builder.Property(x => x.IdCliente)
                .HasColumnName("IdCliente");

            builder.Property(x => x.NmCliente)
                .IsRequired();

            builder.Property(x => x.Cidade)
               .HasColumnName("Cidade")
               .IsRequired();

            builder.HasMany(x => x.Vendas)
               .WithOne(x => x.Cliente)
               .HasForeignKey(x => x.IdCliente);
        }
    }
}
