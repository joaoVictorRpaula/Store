import { Venda } from "../venda/venda";
import { Produto } from "./produto";

export class ProdutoDto {
  IdProduto : Number = 0;
  DscProduto : string = "";
  VlrUnitario : Number = 0;
  QtdVenda : Number = 1;
}
