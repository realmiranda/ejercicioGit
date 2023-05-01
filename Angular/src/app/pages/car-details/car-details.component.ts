import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { CarsService } from "../../services/cars.service";
import {Auto, Response} from "../../interfaces/car";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css']
})
export class CarDetailsComponent implements OnInit {
  titlePage: string = "Detalle de autos";
  car: Auto = <Auto> {};
  isEditable: boolean = false;
  wasValidated: boolean = false;

  formCar: FormGroup;

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private carsService: CarsService
  ) {
    this.formCar = new FormGroup({
      foto: new FormControl(""),
      codigo: new FormControl("", [Validators.required, Validators.minLength(3)]),
      marca: new FormControl("", [Validators.required]),
      modelo: new FormControl("", [Validators.required]),
      anio: new FormControl("", [Validators.required, Validators.minLength(4)]),
      calificacion: new FormControl(0, [Validators.required, Validators.max(5), Validators.min(1)]),
    });
  }

  ngOnInit(): void {
    let id = Number( this._activatedRoute.snapshot.paramMap.get('id') );
    this.getCarById(id);
    this.titlePage += ": " + id;
  }

  buy(): void {
    alert("En construcción");
  }

  getCarById(id: number): void {
    this.carsService.getCar(id).subscribe((response: Response) => {
      if(response.codigo == 1){
        this.car = response.data as Auto;
        this.initForm();
      }
    });
  }

  initForm(){
    this.formCar.controls['marca'].setValue(this.car.marca);
    this.formCar.controls['modelo'].setValue(this.car.modelo);
    this.formCar.controls['anio'].setValue(this.car.anio);
    this.formCar.controls['codigo'].setValue(this.car.codigo);
    this.formCar.controls['foto'].setValue(this.car.foto);
    this.formCar.controls['calificacion'].setValue(this.car.calificacion);
  }

  edit(): void {
    this.isEditable = true;
  }

  cancel(): void {
    this.isEditable = false;
    this.initForm();
  }

  save(): void {
    let carUpdated: Auto = {...this.formCar.value};
    this.wasValidated = true;

    if (this.formCar.valid) {
      this.carsService.updateCar(carUpdated, this.car.id).subscribe((response: Response) => {
          alert(response.mensaje);

          if (response.codigo == 1) {
            this.isEditable = false;
            this.car.marca = this.formCar.controls['marca'].value;
            this.car.codigo = this.formCar.controls['codigo'].value;
            this.car.modelo = this.formCar.controls['modelo'].value;
            this.car.calificacion = this.formCar.controls['calificacion'].value;
            this.car.foto = this.formCar.controls['foto'].value;
            this.car.anio = this.formCar.controls['anio'].value;
            this.wasValidated = false;
          }
        },
        (errorHttp: HttpErrorResponse) => {
          let message = errorHttp.error.mensaje;
          message += errorHttp.error.error?.codigo ? (' - ' + errorHttp.error.error?.codigo) : "";
          message += errorHttp.error.error?.marca ? (' - ' + errorHttp.error.error?.marca) : "";
          message += errorHttp.error.error?.modelo ? (' - ' + errorHttp.error.error?.modelo) : "";
          message += errorHttp.error.error?.anio ? (' - ' + errorHttp.error.error?.anio) : "";
          alert(message);
          this.wasValidated = false;
        });
    }
  }

  onBack(): void {
    this._router.navigate([ "/list" ]);
  }

}
