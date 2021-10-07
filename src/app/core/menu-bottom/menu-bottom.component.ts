import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-menu-bottom',
  templateUrl: './menu-bottom.component.html',
  styleUrls: ['./menu-bottom.component.scss']
})
export class MenuBottomComponent implements OnInit {

  @Output() finalizarCompra = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

}
