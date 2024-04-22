import { ProdutoEndpoint } from './../../../../domain/produto/produto-endpoint';
import { ClienteEndpoint } from './../../../../domain/cliente/cliente-endpoint';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { catchError, throwError } from 'rxjs';
import { Produto } from 'src/app/domain/produto/produto';
import { DialogMessageModal } from 'src/app/shared/dialog-message/dialog-message.modal';
import { Router } from '@angular/router';

@Component({
  selector: 'app-produto-list',
  templateUrl: './produto-list.component.html',
  styleUrls: ['./produto-list.component.scss']
})
export class ProdutoListComponent implements OnInit {
  produtos : Produto[] = [];
  displayedColumns: string[] = ['DscProduto', 'VlrUnitario', 'Actions'];
  dataSource : MatTableDataSource<Produto> = new MatTableDataSource;

  constructor(
    private readonly produtoEndpoint : ProdutoEndpoint,
    private dialog : MatDialog,
    private router : Router
  ) {
   }

  ngOnInit() {
    this.produtoEndpoint.get().subscribe(x => {
      this.produtos = x.value;
      this.dataSource = new MatTableDataSource(this.produtos)
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    this.dataSource.data = this.produtos;
    this.dataSource.data = this.dataSource.data.filter(
      (entry) => entry.DscProduto.toLowerCase().includes(filterValue.toLowerCase()));
  }

  edit(produto : Produto)
  {
    this.router.navigate(['produto/form'], { queryParams: { id: produto.IdProduto } });
  }

  remove(produtos : Produto)
  {
    this.openConfirmDialog().afterClosed().subscribe(x => {
      if (x)
        {
          this.produtoEndpoint.delete(produtos)
          .pipe(catchError((error : any) => {
            this.openErrorDialog();
            return throwError(() => error);
          }))
          .subscribe(x => {
            this.openSuccessDialog().afterClosed().subscribe(x => window.location.reload());
          })
        }
    });
  }

  private openConfirmDialog() : MatDialogRef<DialogMessageModal> {
    return this.dialog.open(DialogMessageModal, {
      width: '350px',
      height: '300px',
      data : {
        iconStatus : "warning",
        message : "Você realmente deseja deletar permanentemente esse registro?",
        showCancelButton : true
      }
    })
  }

  private openErrorDialog() : MatDialogRef<DialogMessageModal> {
    return this.dialog.open(DialogMessageModal, {
      width: '350px',
      height: '300px',
      data : {
        iconStatus : "error",
        message : "Erro ao excluir registro.",
        showCancelButton : false
      }
    })
  }

  private openSuccessDialog() : MatDialogRef<DialogMessageModal> {
    return this.dialog.open(DialogMessageModal, {
      width: '350px',
      height: '300px',
      data : {
        iconStatus : "good",
        message : "Registro excluido com sucesso !",
        showCancelButton : false
      }
    })
  }
}
