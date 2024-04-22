import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { BaseEndpoint } from "../base-endpoint";
import { Venda } from './venda';
import { VendaDto } from './vendaDto';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn:'root'
})
export class VendaEndpoint extends BaseEndpoint<Venda> {

  get endpointOdata(): string {
    return "/odata/Venda";
  }

  get endpoint(): string {
    return "/api/Venda";
  }

  constructor(private httpClient : HttpClient) {
    super(httpClient)
  }

  getById(id : Number, queryString? : string): Observable<Venda>{
    return this.httpClient.get<Venda>(environment.apiUrl + `${this.endpoint}` + `/${id}`)
  }

  saveVenda(vendaDto : VendaDto) : Observable<Venda[]>{
    var saveVendaEndpoint = "/SaveVenda"
    return this.httpClient.post<Venda[]>(environment.apiUrl + this.endpoint + saveVendaEndpoint, vendaDto)
  }

  updateVenda(vendaDto : VendaDto) : Observable<Venda[]>{
    var saveVendaEndpoint = "/UpdateVenda"
    return this.httpClient.put<Venda[]>(environment.apiUrl + this.endpoint + saveVendaEndpoint, vendaDto)
  }
}
