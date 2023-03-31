import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Client, Response} from "../../interfaces/client";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ClientsService} from "../../services/clients.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{
  title: string = "Registro del cliente";
  client: Client;
  contact: boolean = false;

  formClient: FormGroup;

  constructor(private _router: Router, private clientService: ClientsService) {
    this.formClient = new FormGroup({
      nombre: new FormControl("", [Validators.required]),
      apellido: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required, Validators.email]),
      telefono: new FormControl("", [Validators.required]),
    });
  }

  ngOnInit(): void {
  }

  handleSubmit(e: Event): void {
    const { value, valid } = this.formClient;

    if (valid) {
      this.clientService.addClient(value).subscribe((response: Response) => {
          alert(response.mensaje);

          if (response.codigo == 1) {
            this._router.navigate(["/list"]);
          }
        },
        (errorHttp: HttpErrorResponse) => {
          let message = errorHttp.error.mensaje;
          message += errorHttp.error.error?.nombre ? (' - ' + errorHttp.error.error?.nombre) : "";
          message += errorHttp.error.error?.apellido ? (' - ' + errorHttp.error.error?.apellido) : "";
          message += errorHttp.error.error?.email ? (' - ' + errorHttp.error.error?.email) : "";
          message += errorHttp.error.error?.telefono ? (' - ' + errorHttp.error.error?.telefono) : "";
          alert(message);
        });
    }
  }

  goHome(): void {
    this._router.navigate(["/home"]);
  }
}
