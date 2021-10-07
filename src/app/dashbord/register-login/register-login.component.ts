import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {map, take} from 'rxjs/operators';
import {TokenStorageService} from '../../shared/services/token-storage.service';
import {ErrorWarning} from '../../shared/models/error-warning.model';
import {Role} from '../../shared/enums/role.enum';

@Component({
  selector: 'app-register-login',
  templateUrl: './register-login.component.html',
  styleUrls: ['./register-login.component.scss']
})
export class RegisterLoginComponent implements OnInit {
  public loginData: FormGroup = new FormGroup({});
  public loginForm!: any;

  constructor(
    private formBuilder: FormBuilder,
    private tokenStorageService: TokenStorageService
  ) {
  }

  ngOnInit(): void {
    this.createForm();
  }

  private createForm(): void {
    this.loginData = this.formBuilder.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      role: new FormControl(Role.ROLE_USER)
    });
  }

  login(): void {
    this.tokenStorageService.registerUserSession(this.loginData.value)
      .pipe(
        take(1)
      ).subscribe(() => {
      window.location.reload();
    }, (error: ErrorWarning) => {
      console.log(error);
    });
  }
}

