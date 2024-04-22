import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendaPage } from './venda.page';
import { RouterModule, Routes } from '@angular/router';
import { VendaFormComponent } from './component/venda-form/venda-form.component';
import { VendaListComponent } from './component/venda-list/venda-list.component';

const routes: Routes = [
  {
    path:'',
    component: VendaPage,
    children: [
      {
        path: '',
        component: VendaListComponent
      },
      {
        path: 'form',
        component: VendaFormComponent
      },
      {
        path: 'form/:id',
        component: VendaFormComponent
      }
    ]
  }
]



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendaRoutingModule { }
