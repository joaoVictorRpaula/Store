import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { BaseEndpoint } from "../base-endpoint";
import { Produto } from './produto';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn:'root'
})
export class ProdutoEndpoint extends BaseEndpoint<Produto> {

  get endpointOdata(): string {
    return "/odata/Produto";
  }

  get endpoint(): string {
    return "/api/Produto";
  }

  constructor(private httpClient : HttpClient) {
    super(httpClient)
  }

  getById(id : Number, queryString? : string): Observable<Produto>{
    return this.httpClient.get<Produto>(environment.apiUrl + `${this.endpoint}` + `/${id}`)
  }

}
