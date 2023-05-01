import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { Client, Response } from "../interfaces/client";

@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  apiURL = environment.apiURL;
  endpoint: string = "clientes/";
  clientEndpoint: string = "cliente/";

  constructor(private http: HttpClient) { }

  getClientList(filter?:string, rows?:number, page?:number): Observable<Response> {
    let body = new HttpParams();
    body = filter ? body.set('filtro', filter) : body;
    body = rows ? body.set('rows', rows) : body;
    body = page ? body.set('page', page) : body;
    return this.http.get<Response>(`${this.apiURL}${this.endpoint}`, { params:body });
  }

  getClient(id: number): Observable<Response> {
    return this.http.get<Response>(`${this.apiURL}${this.clientEndpoint}${id}`);
  }

  addClient(client: Client): Observable<Response> {
    let body = this.getParams(client);
    return this.http.post<Response>(`${this.apiURL}${this.clientEndpoint}`, body);
  }

  updateClient(client: Client, id: number) {
    let body = this.getParams(client);
    return this.http.put<any>(`${this.apiURL}${this.clientEndpoint}${id}`, body);
  }

  deleteClient(id: number): Observable<Response> {
    return this.http.delete<Response>(`${this.apiURL}${this.clientEndpoint}${id}`);
  }

  getParams(client: Client){
    let body = new HttpParams();
    body = client.nombre ? body.set('nombre', client.nombre) : body;
    body = client.apellido ? body.set('apellido', client.apellido) : body;
    body = client.email ? body.set('email', client.email) : body;
    body = client.telefono ? body.set('telefono', client.telefono) : body;
    return body;
  }
}
