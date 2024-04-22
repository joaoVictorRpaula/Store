import { DialogMessageService } from './../../../../shared/dialog-message/dialog-message.service';
import { ProdutoEndpoint } from './../../../../domain/produto/produto-endpoint';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { Produto } from 'src/app/domain/produto/produto';
import { DialogMessageModal } from 'src/app/shared/dialog-message/dialog-message.modal';

@Component({
  selector: 'app-produto-form',
  templateUrl: './produto-form.component.html',
  styleUrls: ['./produto-form.component.scss']
})
export class ProdutoFormComponent implements OnInit {
  mainForm : FormGroup;
  id : Number = 0;

  constructor(
    private dialog : MatDialog,
    private route : Router,
    private produtoEndpoint : ProdutoEndpoint,
    private fb: FormBuilder,
    private dialogMessageService : DialogMessageService,
    private activeRoute : ActivatedRoute ) 
    {
      this.mainForm = this.fb.group({
        IdProduto: [0 , Validators.required],
        DscProduto: ['' , Validators.required],
        VlrUnitario: ['' , Validators.required],
      })
      this.activeRoute.queryParams.subscribe(params => {
        this.id = params['id'];
    });
    }

  ngOnInit() {
    if (this.id != 0)
      {
        this.produtoEndpoint.getById(this.id).pipe(catchError((error : any) => {
          this.dialogMessageService.openErrorDialog(`Erro ao buscar cliente id ${this.id}`);
          return throwError(() => error);
        }))
        .subscribe(x => {
          this.mainForm.patchValue({
            IdProduto: x.IdProduto,
            DscProduto: x.DscProduto,
            VlrUnitario: x.VlrUnitario
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
    this.produtoEndpoint.post(item).pipe(catchError((error : any) => {
      this.dialogMessageService.openErrorDialog();
      return throwError(() => error);
    }))
    .subscribe(x => {
      this.dialogMessageService.openSuccessDialog().afterClosed().subscribe(x => this.route.navigate(['/produto']));
    });
  }

  private put(){
    var item =  this.mainForm.value;
    this.produtoEndpoint.put(item).pipe(catchError((error : any) => {
      this.dialogMessageService.openErrorDialog();
      return throwError(() => error);
    }))
    .subscribe(x => {
      this.dialogMessageService.openSuccessDialog().afterClosed().subscribe(x => this.route.navigate(['/produto']));
    });
  }
}
