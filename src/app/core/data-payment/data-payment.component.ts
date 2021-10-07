import { Component, OnInit } from '@angular/core';
import { NgwWowService } from 'ngx-wow';

@Component({
  selector: 'app-data-payment',
  templateUrl: './data-payment.component.html',
  styleUrls: ['./data-payment.component.scss']
})
export class DataPaymentComponent implements OnInit {

  dataBank = [
    {
      banco: 'Itau',
      agencia: '7320',
      conta: '02885-0',
      cpf: '397.267.088-50',
    },
    {
      banco: 'Nubank',
      agencia: '0001',
      conta: '29255825-0',
      cpf: '397.267.088-50',
    },
    {
      banco: 'Bradesco',
      agencia: '1363',
      conta: '144505-7',
      cpf: '397.267.088-50',
    },
    {
      banco: 'Caixa',
      agencia: '4154',
      conta: '013 00020827-3',
      cpf: '397.267.088-50',
    },
    {
      banco: 'C6 Bank',
      agencia: '0001',
      conta: '5079220-2',
      cpf: '397.267.088-50',
    }
  ];

  constructor(private wowService: NgwWowService) {
    this.wowService.init();
   }

  ngOnInit(): void {
  }
}
