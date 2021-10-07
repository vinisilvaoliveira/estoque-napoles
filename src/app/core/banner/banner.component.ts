import { Component, OnInit, Renderer2 } from '@angular/core';
import { NgwWowService } from 'ngx-wow';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {

  slideIndex = 0;

  constructor(private renderer: Renderer2, private wowService: NgwWowService) {
    this.wowService.init();
   }

  ngOnInit(): void {
    this.showSlides();
  }

  showSlides(): void {
    let i;
    const slides = document.getElementsByClassName('mySlides');


    for (i = 0; i < slides.length; i++) {
      this.renderer.setStyle(slides[i], 'display', 'none');
      this.renderer.removeClass(slides[i], 'animation');
    }
    this.slideIndex++;
    if (this.slideIndex > slides.length) { this.slideIndex = 1; }

    this.renderer.setStyle(slides[this.slideIndex - 1], 'display', 'block');
    this.renderer.addClass(slides[this.slideIndex - 1], 'animation');
    setTimeout(() => {
      this.showSlides();
    }, 2000);
  }
}
