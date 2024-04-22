import { Component, OnInit } from '@angular/core';
import { NavItem } from 'src/app/domain/nav-item/nav-item';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {
  showFiller = false;
  constructor() { }

  ngOnInit() {
  }
  
  menuItens: NavItem [] = [
    {
      displayName: 'Vendas',
      iconName: 'sell',
      route: 'venda',
    },        
    {
      displayName: 'Produtos',
      iconName: 'inventory_2',
      route: 'produto',
    },
    {
      displayName: 'Clientes',
      iconName: 'person',   
      route: 'cliente',
    }
  ];

}
