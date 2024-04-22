import { DialogMessageService } from './../../../../shared/dialog-message/dialog-message.service';
import { VendaEndpoint } from './../../../../domain/venda/venda-endpoint';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ClienteEndpoint } from './../../../../domain/cliente/cliente-endpoint';
import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/domain/cliente/cliente';
import { Produto } from 'src/app/domain/produto/produto';
import { ProdutoEndpoint } from 'src/app/domain/produto/produto-endpoint';
import { ProdutoDto } from 'src/app/domain/produto/produtoDto';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogMessageModal } from 'src/app/shared/dialog-message/dialog-message.modal';
import { catchError, throwError } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-venda-form',
  templateUrl: './venda-form.component.html',
  styleUrls: ['./venda-form.component.scss']
})
export class VendaFormComponent implements OnInit {

  produtoList : Produto[] = [];
  clienteList : Cliente[] = [];
  mainForm : FormGroup;
  selectedProdutoList : Produto[] = [];
  produtoFormArray : FormArray;
  id : Number = 0;

  constructor(
    private readonly produtoEndpoint : ProdutoEndpoint,
    private readonly clienteEndpoint : ClienteEndpoint,
    private readonly vendaEndpoint : VendaEndpoint,
    private dialog : MatDialog,
    private route : Router,
    private fb: FormBuilder,
    private activeRoute : ActivatedRoute,
    private dialogMessageService : DialogMessageService) 
    {
      this.produtoFormArray = this.fb.array([]);
      this.mainForm = this.fb.group({
        IdVenda : [0],
        Cliente: ['' , Validators.required],
        ProdutoDto: this.produtoFormArray
      })
      this.activeRoute.queryParams.subscribe(params => {
         this.id = params['id'];
    });
    }

  ngOnInit() {
    this.produtoEndpoint.get().subscribe(x => 
      this.produtoList = x.value
    )
    this.clienteEndpoint.get().subscribe(x => 
      this.clienteList = x.value
    )
    
    if (this.id != 0 && this.id != undefined)
    {
      this.vendaEndpoint.getById(this.id).pipe(catchError((error : any) => {
        this.dialogMessageService.openErrorDialog(`Erro ao buscar cliente id ${this.id}`).afterClosed().subscribe(x => this.route.navigate(['/venda']));
        return throwError(() => error);
      }))
      .subscribe(x => {
        this.mainForm.patchValue({
          IdVenda : x.IdVenda,
          Cliente: x.Cliente,
        });
        this.addProduto({IdProduto : x.IdProduto, DscProduto : x.Produto.DscProduto, VlrUnitario : x.Produto.VlrUnitario, QtdVenda : x.QtdVenda})
      });
    }
    else{
      this.addProduto();
    }
    console.log(this.mainForm);
    
  }

  private createProdutoFormGroup(produto: ProdutoDto): FormGroup  {
    return this.fb.group({
      IdProduto: [produto.IdProduto, Validators.required],
      DscProduto: [produto.DscProduto, Validators.required],
      VlrUnitario: [produto.VlrUnitario, Validators.required],
      QtdVenda: [produto.QtdVenda, Validators.required]
    });
  }

  onSelectedProduto(index : number, produto : Produto, event : any){
    console.log(this.mainForm);
    
    if(event.isUserInput)
    {
      this.produtoFormArray.at(index).get("IdProduto")?.setValue(produto.IdProduto);
      this.produtoFormArray.at(index).get("DscProduto")?.setValue(produto.DscProduto);
      this.produtoFormArray.at(index).get("VlrUnitario")?.setValue(produto.VlrUnitario);
    }  
  }

  addProduto(produto? : ProdutoDto){
    const produtoDto = this.createProdutoFormGroup(produto ?? new ProdutoDto());
    this.produtoFormArray.push(produtoDto);
  }

  onRemove (index : number){
    this.produtoFormArray.removeAt(index);
  }

  displayFnCliente(cliente: Cliente) : string {
    return cliente.NmCliente;
  }

  get total(): number {
    let total = 0;
    this.produtoFormArray.controls.forEach((control: AbstractControl) => {
      const qtdVenda = control.get('QtdVenda')?.value;
      const vlrUnitario = control.get('VlrUnitario')?.value;
      total += (qtdVenda * vlrUnitario);
    });
    return total;
  }

  onSubmit(){
    if (this.id == 0 || this.id == undefined)
      {
        this.post();
      }
      else{
        this.put();
      }
    
  }

  private post(){
    var vendaDto =  this.mainForm.value;
    this.vendaEndpoint.saveVenda(vendaDto).pipe(catchError((error : any) => {
      this.dialogMessageService.openErrorDialog();
      return throwError(() => error);
    }))
    .subscribe(x => {
      this.dialogMessageService.openSuccessDialog().afterClosed().subscribe(x => this.route.navigate(['/venda']));
    });
  }

  private put(){
    var vendaDto =  this.mainForm.value;
    this.vendaEndpoint.updateVenda(vendaDto).pipe(catchError((error : any) => {
      this.dialogMessageService.openErrorDialog();
      return throwError(() => error);
    }))
    .subscribe(x => {
      this.dialogMessageService.openSuccessDialog().afterClosed().subscribe(x => this.route.navigate(['/venda']));
    });
  }
}
