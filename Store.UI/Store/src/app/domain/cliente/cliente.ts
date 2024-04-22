import { Venda } from "../venda/venda";

export class Cliente {
  IdCliente : Number = 0;
  NmCliente : string = "";
  Cidade : string = "";
  Vendas : Venda[] = [];
}
