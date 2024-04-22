import { ProdutoEndpoint } from './../../../../domain/produto/produto-endpoint';
import { ClienteEndpoint } from './../../../../domain/cliente/cliente-endpoint';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { catchError, throwError } from 'rxjs';
import { Produto } from 'src/app/domain/produto/produto';
import { DialogMessageModal } from 'src/app/shared/dialog-message/dialog-message.modal';
import { Router } from '@angular/router';
import { DialogMessageService } from 'src/app/shared/dialog-message/dialog-message.service';

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
    private router : Router,
    private dialogMessageService : DialogMessageService
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
    this.dialogMessageService.openConfirmDialog().afterClosed().subscribe(x => {
      if (x)
        {
          this.produtoEndpoint.delete(produtos)
          .pipe(catchError((error : any) => {
            this.dialogMessageService.openErrorDialog(error.error.message);
            return throwError(() => error.error.message);
          }))
          .subscribe(x => {
            this.dialogMessageService.openSuccessDialog().afterClosed().subscribe(x => window.location.reload());
          })
        }
    });
  }
}
