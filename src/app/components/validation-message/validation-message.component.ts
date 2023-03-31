import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl} from "@angular/forms";

@Component({
  selector: 'app-validation-message',
  templateUrl: './validation-message.component.html',
  styleUrls: ['./validation-message.component.css']
})
export class ValidationMessageComponent implements OnInit {
  @Input() control: AbstractControl;
  @Input() submitted: boolean = false;
  constructor() {
  }

  ngOnInit(): void {
  }

  showError() {
    if( !this.control) {
      return false;
    }
    return this.control.invalid && this.submitted;
  }
}
