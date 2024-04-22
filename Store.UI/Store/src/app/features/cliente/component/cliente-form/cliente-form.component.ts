import { DialogMessageService } from './../../../../shared/dialog-message/dialog-message.service';
import { ClienteEndpoint } from './../../../../domain/cliente/cliente-endpoint';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { Cliente } from 'src/app/domain/cliente/cliente';
import { DialogMessageModal } from 'src/app/shared/dialog-message/dialog-message.modal';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.scss']
})
export class ClienteFormComponent implements OnInit {

  mainForm : FormGroup;
  id : Number = 0;

  constructor(
    private dialog : MatDialog,
    private route : Router,
    private clienteEndpoint : ClienteEndpoint,
    private fb: FormBuilder,
    private activeRoute: ActivatedRoute,
    private dialogMessageService : DialogMessageService) 
    {
      this.mainForm = this.fb.group({
        IdCliente: [0 , Validators.required],
        NmCliente: ['' , Validators.required],
        Cidade: ['' , Validators.required],
      })
      this.activeRoute.queryParams.subscribe(params => {
        this.id = params['id'];
    });
    }

  ngOnInit() {
    if (this.id != 0)
    {
      this.clienteEndpoint.getById(this.id).pipe(catchError((error : any) => {
        this.dialogMessageService.openErrorDialog(`Erro ao buscar cliente id ${this.id}`);
        return throwError(() => error);
      }))
      .subscribe(x => {
        this.mainForm.patchValue({
          IdCliente: x.IdCliente,
          NmCliente: x.NmCliente,
          Cidade: x.Cidade
        })
      });
    }
  }

  onSubmit(){
    if (this.id == 0)
    {
      this.post();
    }
    else{
      this.put();
    }
  }

  private post(){
    var item =  this.mainForm.value;
    this.clienteEndpoint.post(item).pipe(catchError((error : any) => {
      this.dialogMessageService.openErrorDialog();
      return throwError(() => error);
    }))
    .subscribe(x => {
      this.dialogMessageService.openSuccessDialog().afterClosed().subscribe(x => this.route.navigate(['/cliente']));
    });
  }

  private put(){
    var item =  this.mainForm.value;
    this.clienteEndpoint.put(item).pipe(catchError((error : any) => {
      this.dialogMessageService.openErrorDialog();
      return throwError(() => error);
    }))
    .subscribe(x => {
      this.dialogMessageService.openSuccessDialog().afterClosed().subscribe(x => this.route.navigate(['/cliente']));
    });
  }
}
