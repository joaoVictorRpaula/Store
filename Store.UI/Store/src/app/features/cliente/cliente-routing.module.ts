import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ClientePage } from './cliente.page';
import { ClienteListComponent } from './component/cliente-list/cliente-list.component';
import { ClienteFormComponent } from './component/cliente-form/cliente-form.component';

const routes: Routes = [
  {
    path:'',
    component: ClientePage,
    children: [
      {
        path: '',
        component: ClienteListComponent
      },
      {
        path: 'form',
        component: ClienteFormComponent
      },
      {
        path: 'form/:id',
        component: ClienteFormComponent
      }
    ]
  }
]



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteRoutingModule { }
