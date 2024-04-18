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
    public class ProdutoClassMap : IEntityTypeConfiguration<Produto>
    {
        public void Configure(EntityTypeBuilder<Produto> builder)
        {
            builder.ToTable("Produto");
            builder.HasKey(x => x.IdProduto);

            builder.Property(x => x.DscProduto)
                .HasColumnName("DscProduto")
                .IsRequired();

            builder.Property(x => x.VlrUnitario)
               .HasColumnName("VlrUnitario")
               .IsRequired();

            builder.HasMany(x => x.Vendas)
               .WithOne(x => x.Produto)
               .HasForeignKey(x => x.IdProduto);
        }
    }
}
