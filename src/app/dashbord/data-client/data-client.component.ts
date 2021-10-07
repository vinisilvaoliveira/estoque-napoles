import {Component, OnInit} from '@angular/core';
import {map, take} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {CustomerService} from '../../shared/services/customer.service';
import {Customer} from '../../shared/models/customer';
import {NumberService} from '../../shared/services/number.service';
import {Numbers} from '../../shared/models/numbers';
import {zip} from 'rxjs';

@Component({
  selector: 'app-data-client',
  templateUrl: './data-client.component.html',
  styleUrls: ['./data-client.component.scss']
})
export class DataClientComponent implements OnInit {

  numberChoose: any;

  numbers: Numbers[] = [];
  listItem = [];
  listItemRemove = [];

  numbersContract: Numbers[] = [];

  public customer!: Customer;
  hasError!: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private customerService: CustomerService,
    private numberService: NumberService
  ) {
  }

  ngOnInit(): void {

    this.route.params.pipe(
      map(p => p.id)
    ).subscribe(id => {
      this.customerService.getAllById(id)
        .subscribe(r => {
          this.customer = r;
          this.getNumbers();
          this.getNumbersContract();
        }, () => {
          this.hasError = true;
        });
    });
  }

  getNumbers(): void {
    this.numberService.getAll()
      .pipe(take(1))
      .subscribe(r => {
        this.numbers = r.filter(n => n.active);
      }, () => {
        this.hasError = true;
      });
  }

  getNumbersContract(): void {
    this.numberService.getAlByCustumer(this.customer.id)
      .pipe(take(1))
      .subscribe(r => {
        this.numbersContract = r;
      }, () => {
        this.hasError = true;
      });
  }

  getNumber(el): void {
    const numberRemove = this.listItem.find((l) => l === el);
    if (numberRemove) {
      this.listItem = this.listItem.filter(n => n !== numberRemove);
    } else {
      this.listItem.push(el);
    }
  }

  getNumberRemove(el): void {
    const numberRemove = this.listItemRemove.find((l) => l === el);
    if (numberRemove) {
      this.listItemRemove = this.listItemRemove.filter(n => n !== numberRemove);
    } else {
      this.listItemRemove.push(el);
    }
  }

  findColors(num: Numbers): boolean {
    return this.listItem.find((n) => n === num);
  }

  findColorsRemove(num: Numbers): boolean {
    return this.listItemRemove.find((n) => n === num);
  }

  add(e: Numbers[]): void {
    const requests = [];
    e.forEach((n: Numbers) => {
      requests.push(this.numberService.buyNumber(n.id, this.customer.id));
    });
    zip(...requests)
      .pipe(take(1))
      .subscribe(() => {
        this.listItemRemove = [];
        this.listItem = [];
        this.getNumbers();
        this.getNumbersContract();
      }, () => {
        this.hasError = true;
      });
  }

  remove(e: Numbers[]): void {
    const requests = [];
    e.forEach((n: Numbers) => {
      requests.push(this.numberService.removeCustomer(n.id));
    });
    zip(...requests)
      .pipe(take(1))
      .subscribe(() => {
        this.listItemRemove = [];
        this.listItem = [];
        this.getNumbers();
        this.getNumbersContract();
      }, () => {
        this.hasError = true;
      });
  }

}
