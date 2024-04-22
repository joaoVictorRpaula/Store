import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProdutoPage } from './produto.page';
import { ProdutoRoutingModule } from './produto-routing.module';
import { ProdutoListComponent } from './component/produto-list/produto-list.component';
import { ProdutoFormComponent } from './component/produto-form/produto-form.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ProdutoRoutingModule,
    SharedModule
  ],
  declarations: [
    ProdutoPage,
    ProdutoListComponent,
    ProdutoFormComponent
  ]
})
export class ProdutoModule { }
