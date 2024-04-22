import { Venda } from 'src/app/domain/venda/venda';
import { VendaEndpoint } from './../../../../domain/venda/venda-endpoint';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, catchError, throwError } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogMessageModal } from 'src/app/shared/dialog-message/dialog-message.modal';
import { Router } from '@angular/router';
import { DialogMessageService } from 'src/app/shared/dialog-message/dialog-message.service';

@Component({
  selector: 'app-venda-list',
  templateUrl: './venda-list.component.html',
  styleUrls: ['./venda-list.component.scss']
})
export class VendaListComponent implements OnInit {
  vendas : Venda[] = [];
  displayedColumns: string[] = ['DscProduto', 'NmCliente', 'DthVenda','QtdVenda','VlrTotalVenda', 'Actions'];
  dataSource : MatTableDataSource<Venda> = new MatTableDataSource;

  constructor(
    private readonly vendaEndpoint : VendaEndpoint,
    private dialog : MatDialog,
    private router : Router,
    private dialogMessageService : DialogMessageService
  ) {
   }

  ngOnInit() {
    const query = "?$expand= Cliente, Produto"
    this.vendaEndpoint.get(query).subscribe(x => {
      this.vendas = x.value;
      this.dataSource = new MatTableDataSource(this.vendas)
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    this.dataSource.data = this.vendas;
    this.dataSource.data = this.dataSource.data.filter(
      (entry) => entry.Cliente.NmCliente.toLowerCase().includes(filterValue.toLowerCase()) || entry.Produto.DscProduto.toLowerCase().includes(filterValue.toLowerCase())
    );
  }

  edit(venda : Venda)
  {
    this.router.navigate(['venda/form'], { queryParams: { id: venda.IdVenda } });
  }

  remove(venda : Venda)
  {
    this.dialogMessageService.openConfirmDialog().afterClosed().subscribe(x => {
      if (x)
        {
          this.vendaEndpoint.delete(venda)
          .pipe(catchError((error : any) => {
            this.dialogMessageService.openErrorDialog();
            return throwError(() => error);
          }))
          .subscribe(x => {
            this.dialogMessageService.openSuccessDialog().afterClosed().subscribe(x => window.location.reload());
          })
        }
    });
  }
}
