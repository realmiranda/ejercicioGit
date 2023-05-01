import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  apiURL = environment.apiURL;
  endpoint: string = "sign-up";

  constructor(private http: HttpClient) { }
}
