import { Cliente } from "./cliente/cliente";
import { Produto } from "./produto/produto";

export class OdataListEntity<T> {
  ['@odata.context'] : string = '';
  value : T[] = [];
}
