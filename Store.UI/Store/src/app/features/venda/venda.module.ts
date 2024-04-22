import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendaPage } from './venda.page';
import { VendaRoutingModule } from './venda-routing.module';
import { VendaListComponent } from './component/venda-list/venda-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { VendaFormComponent } from './component/venda-form/venda-form.component';

@NgModule({
  imports: [
    CommonModule,
    VendaRoutingModule,
    SharedModule
  ],
  declarations: [
    VendaPage,
    VendaListComponent,
    VendaFormComponent
  ]
})
export class VendaModule { }
