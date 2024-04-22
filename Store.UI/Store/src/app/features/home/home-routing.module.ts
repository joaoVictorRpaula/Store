import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path:'',
    component: HomePage,
    children: [
      {
        path:"venda",
        loadChildren:() => import('../venda/venda.module').then(x => x.VendaModule)
      },
      {
        path:"produto",
        loadChildren:() => import('../produto/produto.module').then(x => x.ProdutoModule)
      },
      {
        path:"cliente",
        loadChildren:() => import('../cliente/cliente.module').then(x => x.ClienteModule)
      },
    ]
  }
]



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
