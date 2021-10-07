import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
// import {map, take} from 'rxjs/operators';
import {Role} from '../../shared/enums/role.enum';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginData: FormGroup = new FormGroup({});
  modalVoid: boolean;

  constructor(
    private formBuilder: FormBuilder,
    // private tokenStorageService: TokenStorageService,
    private router: Router,
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
    if (this.loginData.invalid) {
      Object.keys(this.loginData.controls).forEach(field => {
        const control = this.loginData.get(field);
        control.markAsTouched({ onlySelf: true });
      });

    }else {
      console.log('entou');
      if (this.loginData.value.username === 'italo' && this.loginData.value.password === '@italo2021') {
        this.router.navigateByUrl('/clientes');
      }else {
        console.log('test');
        if (this.loginData.value.username !== 'italo') {
          return this.loginData.get('username').setErrors({ invalid: true });
        }
        if (this.loginData.value.password !== '@italo2021') {
          return this.loginData.get('password').setErrors({ invalid: true });
        }
      }
    }
    // this.tokenStorageService.authenticateUserSession(this.loginData.value)
    //   .pipe(
    //     take(1)
    //   ).subscribe(() => {
      // this.router.navigateByUrl('/clientes');
  //   }, () => {
  //     this.modalVoid = true;
  //   });
  }
}
