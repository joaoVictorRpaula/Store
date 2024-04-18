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
    public class VendaClassMap : IEntityTypeConfiguration<Venda>
    {
        public void Configure(EntityTypeBuilder<Venda> builder)
        {
            builder.ToTable("Venda");
            builder.HasKey(x => x.IdVenda);

            builder.Property(x => x.IdProduto)
                .HasColumnName("IdProduto")
                .IsRequired();

            builder.Property(x => x.IdCliente)
               .HasColumnName("IdCliente")
               .IsRequired();

            builder.Property(x => x.QtdVenda)
               .HasColumnName("QtdVenda")
               .IsRequired();

            builder.Property(x => x.VlrUnitarioVenda)
               .HasColumnName("VlrUnitarioVenda")
               .IsRequired();

            builder.Property(x => x.DthVenda)
               .HasColumnName("DthVenda")
               .IsRequired();

            builder.Property(x => x.VlrTotalVenda)
               .HasColumnName("VlrTotalVenda")
               .IsRequired();

            builder.HasOne(x => x.Cliente)
                .WithMany(x => x.Vendas)
                .HasForeignKey(x => x.IdCliente);

            builder.HasOne(x => x.Produto)
               .WithMany(x => x.Vendas)
               .HasForeignKey(x => x.IdProduto);
        }
    }
}
