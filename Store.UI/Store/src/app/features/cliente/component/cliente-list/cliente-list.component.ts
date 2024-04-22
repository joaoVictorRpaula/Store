import { DialogMessageService } from './../../../../shared/dialog-message/dialog-message.service';
import { ClienteEndpoint } from './../../../../domain/cliente/cliente-endpoint';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { catchError, throwError } from 'rxjs';
import { Cliente } from 'src/app/domain/cliente/cliente';
import { DialogMessageModal } from 'src/app/shared/dialog-message/dialog-message.modal';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.scss']
})
export class ClienteListComponent implements OnInit {

  clientes : Cliente[] = [];
  displayedColumns: string[] = ['NmCliente', 'Cidade', 'Actions'];
  dataSource : MatTableDataSource<Cliente> = new MatTableDataSource;

  constructor(
    private readonly clienteEndpoint : ClienteEndpoint,
    private dialog : MatDialog,
    private dialogMessageService : DialogMessageService,
    private router : Router
  ) {
   }

  ngOnInit() {
    this.clienteEndpoint.get().subscribe(x => {
      this.clientes = x.value;
      this.dataSource = new MatTableDataSource(this.clientes)
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    this.dataSource.data = this.clientes;
    this.dataSource.data = this.dataSource.data.filter(
      (entry) => entry.NmCliente.toLowerCase().includes(filterValue.toLowerCase()));
  }

  edit(cliente : Cliente)
  {
    this.router.navigate(['cliente/form'], { queryParams: { id: cliente.IdCliente } });
  }

  remove(clientes : Cliente)
  {
    this.dialogMessageService.openConfirmDialog().afterClosed().subscribe(x => {
      if (x)
        {
          this.clienteEndpoint.delete(clientes)
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
