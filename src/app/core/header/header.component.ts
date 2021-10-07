import {Component, HostListener, OnInit} from '@angular/core';
import {NgwWowService} from 'ngx-wow';
import {TokenStorageService} from '../../shared/services/token-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  slideIndex = 0;

  topPosToStartShowing = 10;
  showButton: boolean;
  isLogged = false;

  constructor(private wowService: NgwWowService, private tokenStorageService: TokenStorageService
  ) {
    this.wowService.init();
  }

  ngOnInit(): void {
    this.showButton = false;
    this.checkScroll();
    this.isLogged = this.tokenStorageService.isLoggedIn() ? true : false;
  }

  @HostListener('window:scroll')

  checkScroll(): void {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    if (scrollPosition >= this.topPosToStartShowing) {
      this.showButton = true;
    } else {
      this.showButton = false;
    }
  }

  loggout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}
