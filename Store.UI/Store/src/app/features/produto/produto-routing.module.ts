import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProdutoPage } from './produto.page';
import { ProdutoListComponent } from './component/produto-list/produto-list.component';
import { ProdutoFormComponent } from './component/produto-form/produto-form.component';

const routes: Routes = [
  {
    path:'',
    component: ProdutoPage,
    children: [
      {
        path: '',
        component: ProdutoListComponent
      },
      {
        path: 'form',
        component: ProdutoFormComponent
      },
      {
        path: 'form/:id',
        component: ProdutoFormComponent
      }
    ]
  }
]



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProdutoRoutingModule { }
