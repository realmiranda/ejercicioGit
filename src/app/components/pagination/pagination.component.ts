import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnChanges {
  @Input() currentPage: number = 1;
  @Input() itemsPerPage: number = 10;
  @Input() totalPages: number = 0;
  @Input() list: any[] = [];
  @Output() setPage =  new EventEmitter<number>()

  pages: number[] = [];

  constructor() { }

  onClick(page: number):void {
    this.setPage.emit(page);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.calculatePages();
  }

  // Calcula la lista de páginas
  calculatePages() {
    this.pages = [];

    for (let i = 1; i <= this.totalPages; i++) {
      this.pages.push(i);
    }
  }

}
