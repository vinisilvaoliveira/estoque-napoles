import { Component, OnInit } from '@angular/core';
import { NgwWowService } from 'ngx-wow';

@Component({
  selector: 'app-slide-show',
  templateUrl: './slide-show.component.html',
  styleUrls: ['./slide-show.component.scss']
})
export class SlideShowComponent implements OnInit {

  slides = [
    {img: '/assets/moto/foto-1-teste.png'},
    {img: '/assets/moto/foto-2.png'},
    {img: '/assets/moto/foto-3.png'},
    {img: '/assets/moto/foto-4.png'},
    // {img: '/assets/moto/foto-5.jpg'}
  ];
  slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    dots: true,
    adaptiveHeight: true,
    arrows: true
  };

  constructor(private wowService: NgwWowService) {
    this.wowService.init();
  }

  ngOnInit(): void {
  }
}
