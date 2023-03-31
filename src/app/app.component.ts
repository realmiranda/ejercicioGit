import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = 'Aplicación de venta de autos';
  country: string = "Ecuador"

  testMethod(): void {

  }
}
