import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { CAR_HEADER } from "../../data/car";
import { Auto, Header, Response } from "../../interfaces/car";
import { CarsService } from "../../services/cars.service";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import * as bootstrap from "bootstrap";
import {HttpErrorResponse} from "@angular/common/http";


@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit {
  @ViewChild('exampleModal') private modal: any;
  titleCarList: string = "LISTA DE AUTOMÓVILES";

  carList: Auto[] = [];
  carListFavorites: Auto[] = [];
  header: Header[] = CAR_HEADER;

  filterBy: string = "";
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages = 0;
  selectorPages: number[] = [5, 10, 25,50, 100, 500];

  formCar: FormGroup;
  myModal: any;
  wasValidated: boolean = false;


  showImage: boolean = false;
  imageWidth: number = 120;
  imageMargin: number = 3;


  constructor(
    private carsService: CarsService,
    private formBuilder: FormBuilder,
  ) {
    this.formCar = new FormGroup({
      foto: new FormControl(""),
      codigo: new FormControl("", [Validators.required]),
      marca: new FormControl("", [Validators.required]),
      modelo: new FormControl("", [Validators.required]),
      anio: new FormControl("", [Validators.required, Validators.min(4)]),
      calificacion: new FormControl(0, [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.getCars();

    const element = document.getElementById("exampleModal") as Element
    this.myModal = new bootstrap.Modal(element);
  }

  filterCars(): void {
    this.currentPage = 1;
    this.getCars();
  }

  getCars(): void {
    this.carsService.getCarList(this.filterBy, this.itemsPerPage, this.currentPage).subscribe(
      (response: Response) => {
      if (response.codigo == 1) {
        this.carList = response.data as Auto[];
        this.totalPages = response.pages;
        this.itemsPerPage = response.rows;
      }
    });
  }

  createCar(): void {
    const { value, valid } = this.formCar;
    this.wasValidated = true;

    if (valid) {
      this.carsService.addCar(value).subscribe((response: Response) => {
        alert(response.mensaje);

        if (response.codigo == 1) {
          this.getCars();
          this.clearForm();
          this.hideModal();
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

  deleteCar(id: number): void {
    if(id) {
      this.carsService.deleteCar(id).subscribe((response: Response) => {
        if (response.codigo == 1) {
          alert(response.mensaje);
          this.getCars();
        }
      });
    }
  }

  clearForm():void {
    this.formCar.clearValidators();
    this.formCar.reset();
  }

  openModal(): void {
    this.myModal.show();
  }

  hideModal(): void {
    this.myModal.hide();
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  onClickStar(message: string): void {
    alert("They clicked on the rating: " + message);
  }

  changeItemsPerPage() {
    this.getCars();
  }

  setPage(page: number) {
    this.currentPage = page;
    this.getCars();
  }
}
