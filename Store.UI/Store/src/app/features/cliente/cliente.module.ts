import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientePage } from './cliente.page';
import { ClienteRoutingModule } from './cliente-routing.module';
import { ClienteFormComponent } from './component/cliente-form/cliente-form.component';
import { ClienteListComponent } from './component/cliente-list/cliente-list.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ClienteRoutingModule,
    SharedModule
  ],
  declarations: [
    ClientePage,
    ClienteFormComponent,
    ClienteListComponent
  ]
})
export class ClienteModule { }
