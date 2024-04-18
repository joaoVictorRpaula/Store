using Microsoft.AspNetCore.OData;
using Microsoft.OData.ModelBuilder;
using Store.DOMAIN.Model;

namespace Store.API
{
    public static class ODataSetup
    {
        private static ODataModelBuilder objBuilder;

        public static IServiceCollection ConfigureServicesOData(this IServiceCollection services)
        {
            objBuilder = new ODataConventionModelBuilder();
            ConfigureEntitySets(objBuilder);

            services.AddControllers().AddOData(
            options => options.Select().Filter().OrderBy().Expand().Count().SetMaxTop(null).AddRouteComponents(
                "odata",
                objBuilder.GetEdmModel()));
            return services;
        }

        private static void ConfigureEntitySets(ODataModelBuilder builder)
        {
            builder.EntitySet<Venda>("Venda").EntityType.HasKey(t => t.IdVenda);
            builder.EntitySet<Cliente>("Cliente").EntityType.HasKey(t => t.IdCliente);
            builder.EntitySet<Produto>("Produto").EntityType.HasKey(t => t.IdProduto);
        }
    }
}
