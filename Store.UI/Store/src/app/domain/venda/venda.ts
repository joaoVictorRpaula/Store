import { Cliente } from "../cliente/cliente";
import { Produto } from "../produto/produto";

export class Venda {
  IdVenda : Number = 0;
  IdCliente : Number = 0;
  IdProduto : Number = 0;
  QtdVenda : Number = 0;
  VlrUnitarioVenda : Number = 0;
  DthVenda : Date = new Date();
  VlrTotalVenda : Number = 0;
  Cliente : Cliente = new Cliente();
  Produto : Produto = new Produto();
}
