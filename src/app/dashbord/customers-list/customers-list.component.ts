import {Component, OnInit} from '@angular/core';
import {Customer} from '../../shared/models/customer';
import {CustomerService} from '../../shared/services/customer.service';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.scss']
})
export class CustomersListComponent implements OnInit {
  hasError;
  customers: Customer[] = [];

  setarJson = [
    {
        "id": 1,
        "name": "feijão",
        "cod": 11989821072,
        "lote": "11989821072",
        "validade": "01/10/2021",
        "total": 7
    },
    {
      "id": 2,
      "name": "arroz",
      "cod": 11989821072,
      "lote": "11989821072",
      "validade": "11/10/2021",
      "total": 10
    }
]
  constructor(
    // private customerService: CustomerService
  ) {
    // localStorage.setItem('data_client', JSON.stringify(this.setarJson))
  }

  ngOnInit(): void {

    if (localStorage.getItem("data_client")) {
      this.customers = JSON.parse(localStorage.getItem("data_client"));
    } else {
      this.hasError = true;
    }

    // this.customerService.getAll()
    //   .pipe(take(1))
    //   .subscribe(c => {
    //     this.customers = c;
    //   }, () => {
    //     this.hasError = true;
    //   });
  }

  search(search: string): Customer[] {
    if (search === '' || search === undefined || search === null) {
        return this.customers;
    }
    return this.customers.filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.cod.toString().includes(search.toLowerCase()));
  }

}
