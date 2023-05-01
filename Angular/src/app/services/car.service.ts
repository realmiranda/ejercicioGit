import {Injectable} from '@angular/core';
import {CAR_LIST} from "../data/car";

interface Auto {
  id: number,
  marca: string,
  model: string,
  imageUrl: string,
  year: number,
  stars: number,
  name: string,
  color: string,
  km: string,
  price: number,
}


@Injectable({
  providedIn: 'root'
})
export class CarService {
  carList = CAR_LIST;

  constructor() { }

  private _returnCarList(): Auto[] {
    return this.carList;
  };


  getCarList(): Auto[] {
    return this._returnCarList();
  }

  getCar(id: number): Auto {
    return this._returnCarList().find(car => car.id === id) || <Auto> {};
  }

  addCar(data: Auto): Auto[] {
    const autos = this._returnCarList();
    autos.push({ ...data });
    return autos;
  }

  deleteCar(id: number): Auto[] {
    const autos = this._returnCarList();
    this.carList = autos.filter((auto) => auto.id !== id)
    return this.carList;
  }
}
