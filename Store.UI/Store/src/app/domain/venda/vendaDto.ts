import { Cliente } from "../cliente/cliente";
import { ProdutoDto } from "../produto/produtoDto";

export class VendaDto {
  IdVenda : Number = 0;
  Produto : ProdutoDto[] = [];
  Cliente : Cliente = new Cliente();
}
