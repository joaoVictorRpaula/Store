import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { OdataListEntity } from "./odata-list-entity";

export abstract class BaseEndpoint<TEntity> {

  abstract get endpointOdata(): string;
  abstract get endpoint(): string;
  private headers : HttpHeaders = new HttpHeaders();

  constructor(private client : HttpClient) {
  }

  get(queryString? : string): Observable<OdataListEntity<TEntity>>{
    if(queryString)
    {
      return this.client.get<OdataListEntity<TEntity>>(environment.apiUrl +`${this.endpointOdata}${queryString}`)
    }
    return this.client.get<OdataListEntity<TEntity>>(environment.apiUrl + `${this.endpointOdata}`)
  }

  delete(entity : TEntity): Observable<TEntity>{
    return this.client.delete<TEntity>(environment.apiUrl + `${this.endpoint}`,{body : entity});
  }

  post(entity : TEntity): Observable<TEntity>{
    return this.client.post<TEntity>(environment.apiUrl + `${this.endpoint}`, entity);
  }

  put(entity : TEntity): Observable<TEntity>{
    return this.client.put<TEntity>(environment.apiUrl + `${this.endpoint}`,  entity);
  }
}
