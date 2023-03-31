import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import { faStar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.css']
})
export class StarComponent implements OnChanges {
  @Input() rating: number = 0;
  @Output() starClick =  new EventEmitter<string>();

  faStar = faStar;
  stars: any[] = [];

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    this.stars = [];
    for( let i = 1; i<= Number(this.rating); i++ ){
      this.stars.push(1);
    }
  }

  onClick(stars: number):void {
    this.starClick.emit("Rating: " + stars);
  }


}
