import {Component, OnInit} from '@angular/core';
import {NumberService} from '../../shared/services/number.service';
import {take} from 'rxjs/operators';
import {NgwWowService} from 'ngx-wow';
import {Numbers} from '../../shared/models/numbers';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buttom-legend',
  templateUrl: './buttom-legend.component.html',
  styleUrls: ['./buttom-legend.component.scss']
})
export class ButtomLegendComponent implements OnInit {
  public dataClient: FormGroup = new FormGroup({});
  listItem = [];
  modal: boolean;
  modalVoid: boolean;
  numbers: Numbers[] = [];
  numbersAvailable: Numbers[] = [];
  numbersReserved: Numbers[] = [];

  clientName: string;
  clientTel: string;

  allNumbers: Numbers[] = [];

  hasError!: boolean;

  numbersChoose: string;
  colorBackground: any;

  images = [
    {path: '/assets/moto/foto-5.jpg'},
    {path: '/assets/moto/foto-2.jpg'},
    {path: '/assets/moto/foto-3.jpg'},
    {path: '/assets/moto/foto-4.jpg'},
    {path: '/assets/moto/foto-1.jpg'},
  ];

  constructor(
    private numberService: NumberService,
    private wowService: NgwWowService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.wowService.init();
  }

  ngOnInit(): void {
    this.numberService.getAll()
      .pipe(take(1))
      .subscribe(r => {
        this.allNumbers = r;
        this.numbers = r.filter(n => n.active);
        this.numbersAvailable =  r.filter(n => n.active);
        this.numbersReserved =  r.filter(n => !n.active);
      }, () => {
        this.hasError = true;
      });
    this.createForm();
  }

  private createForm(): void {
    this.dataClient = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      tel: new FormControl('', Validators.required),
    });
  }

  filter(active: boolean): void {
    this.numbers = this.allNumbers.filter(n => n.active === active);
  }

  selected(): void {
    this.numbers = this.listItem;
  }

  getNumber(el): void {
    const numberRemove = this.listItem.find((l) => l === el);
    if (numberRemove) {
      this.listItem = this.listItem.filter(n => n !== numberRemove);
    } else {
      this.listItem.push(el);
    }

  }

  removeCompra(e): void {
    const numberRemoveCompra = this.listItem.find((l) => l === e);
    this.listItem = this.listItem.filter(n => n !== numberRemoveCompra);
  }

  findColors(num: Numbers): boolean {
    return this.listItem.find((n) => n === num);
  }

  popUpOn(): void {
    if (this.listItem.length < 1) {
      this.modalVoid = true;
    } else {
      this.modal = true;
    }
  }

  sendMessage(): void {
    Object.keys(this.dataClient.controls).forEach((field) => {
      const control = this.dataClient.get(field);
      control.markAsTouched({ onlySelf: true });
    });
    if (!this.dataClient.invalid) {
      this.clientName = this.dataClient.get('name').value;
      this.clientTel = this.dataClient.get('tel').value;

      const valorTotal = this.listItem.length * 25;
      this.convertString();
      if (this.isMobile()) {
        window.open('https://api.whatsapp.com/send?phone=5511986354536&text=Nome: ' + this.clientName  + ', Telefone: ' + this.clientTel + ', Número(s) escolhido(s) ' + this.numbersChoose + ' Valor total: R$ ' + valorTotal + ',00.', '_blank');
      } else {
        window.open('https://web.whatsapp.com/send?phone=5511986354536&text=Nome: ' + this.clientName  + ', Telefone: ' + this.clientTel + ', Número(s) escolhido(s) ' + this.numbersChoose + ' Valor total: R$ ' + valorTotal + ',00.', '_blank');
      }
      this.modal = false;
      this.listItem = [];
    }
  }

  isMobile(): boolean {
    const userAgent = window.navigator.userAgent.toLocaleLowerCase();
    return userAgent.includes('iphone') || userAgent.includes('android');
}

convertString(): void {
  let numbers = '';
  for (const i of this.listItem) {
    this.numbersChoose = numbers += i.number += ','.toString();
  }
}

}
