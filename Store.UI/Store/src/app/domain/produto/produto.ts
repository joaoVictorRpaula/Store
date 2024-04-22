import { Venda } from "../venda/venda";

export class Produto {
  IdProduto : Number = 0;
  DscProduto : string = "";
  VlrUnitario : Number = 0;
  Vendas : Venda[] = [];
}
