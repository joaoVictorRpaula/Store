import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { BaseEndpoint } from "../base-endpoint";
import { Cliente } from "./cliente";
import { Observable } from 'rxjs';
import { OdataListEntity } from '../odata-list-entity';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn:'root'
})
export class ClienteEndpoint extends BaseEndpoint<Cliente> {

  get endpointOdata(): string {
    return "/odata/Cliente";
  }

  get endpoint(): string {
    return "/api/Cliente";
  }

  constructor(private httpClient : HttpClient) {
    super(httpClient)
  }

  getById(id : Number, queryString? : string): Observable<Cliente>{
    return this.httpClient.get<Cliente>(environment.apiUrl + `${this.endpoint}` + `/${id}`)
  }

}
