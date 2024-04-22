USE [Store]
GO

/****** Object:  Table [dbo].[Venda]    Script Date: 21/04/2024 22:43:37 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Venda](
	[IdVenda] [bigint] IDENTITY(1,1) NOT NULL,
	[IdCliente] [bigint] NOT NULL,
	[IdProduto] [bigint] NOT NULL,
	[QtdVenda] [int] NOT NULL,
	[VlrUnitarioVenda] [float] NOT NULL,
	[DthVenda] [datetime] NOT NULL,
	[VlrTotalVenda] [float] NOT NULL,
 CONSTRAINT [PK_Venda] PRIMARY KEY CLUSTERED 
(
	[IdVenda] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[Venda]  WITH CHECK ADD  CONSTRAINT [FK_Venda_Cliente] FOREIGN KEY([IdCliente])
REFERENCES [dbo].[Cliente] ([IdCliente])
GO

ALTER TABLE [dbo].[Venda] CHECK CONSTRAINT [FK_Venda_Cliente]
GO

ALTER TABLE [dbo].[Venda]  WITH CHECK ADD  CONSTRAINT [FK_Venda_Produto] FOREIGN KEY([IdProduto])
REFERENCES [dbo].[Produto] ([IdProduto])
GO

ALTER TABLE [dbo].[Venda] CHECK CONSTRAINT [FK_Venda_Produto]
GO

ALTER TABLE [dbo].[Venda]  WITH CHECK ADD  CONSTRAINT [FK_Venda_Venda] FOREIGN KEY([IdVenda])
REFERENCES [dbo].[Venda] ([IdVenda])
GO

ALTER TABLE [dbo].[Venda] CHECK CONSTRAINT [FK_Venda_Venda]
GO


