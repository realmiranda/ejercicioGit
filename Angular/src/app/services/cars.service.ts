import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Auto, Response} from "../interfaces/car";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CarsService {
  apiURL = environment.apiURL;
  endpoint: string = "vehiculos/";
  carEndpoint: string = "vehiculo/";

  constructor(private http: HttpClient) { }

  getCarList(filter?:string, rows?:number, page?:number): Observable<Response> {
    let body = new HttpParams();
    body = filter ? body.set('filtro', filter) : body;
    body = rows ? body.set('rows', rows) : body;
    body = page ? body.set('page', page) : body;
    return this.http.get<Response>(`${this.apiURL}${this.endpoint}`, { params:body });
  }

  getCar(id: number): Observable<Response> {
    return this.http.get<Response>(`${this.apiURL}${this.carEndpoint}${id}`);
  }

  addCar(car: Auto): Observable<Response> {
    let body = this.getCarParams(car);
    return this.http.post<Response>(`${this.apiURL}${this.carEndpoint}`, body);
  }

  updateCar(car: Auto, id: number) {
    let body = this.getCarParams(car);
    return this.http.put<any>(`${this.apiURL}${this.carEndpoint}${id}`, body);
  }

  deleteCar(id: number): Observable<Response> {
    return this.http.delete<Response>(`${this.apiURL}${this.carEndpoint}${id}`);
  }

  getCarParams(car: Auto){
    let body = new HttpParams();
    body = car.codigo ? body.set('codigo', car.codigo) : body;
    body = car.marca ? body.set('marca', car.marca) : body;
    body = car.modelo ? body.set('modelo', car.modelo) : body;
    body = car.anio ? body.set('anio', car.anio) : body;
    body = car.calificacion ? body.set('calificacion', car.calificacion) : body;
    body = car.foto ? body.set('foto', car.foto) : body;
    return body;
  }
}
