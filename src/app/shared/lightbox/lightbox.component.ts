import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-lightbox',
  templateUrl: './lightbox.component.html',
  styleUrls: ['./lightbox.component.scss']
})
export class LightboxComponent {
  @Output() closeModal = new EventEmitter<any>();
  constructor() {}
}
