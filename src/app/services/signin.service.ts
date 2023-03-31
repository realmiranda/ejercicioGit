import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SigninService {
  apiURL = environment.apiURL;
  endpoint: string = "sign-in";

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ "content-type": "application/json" })
  }

  login(username:string, password: string, app: string): Observable<any> {
    let body = new HttpParams();

    body = body.set("username", username);
    body = body.set("password", password);
    body = body.set("app", app);

    return this.http.post<any>(`${this.apiURL}${this.endpoint}`, body);
  }
}
