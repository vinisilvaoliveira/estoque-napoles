import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Customer} from '../models/customer';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  api: string = environment.WALLI_API + 'customers/';

  constructor(
    private http: HttpClient
  ) {
  }

  save(customer: Customer): void {
    console.log(customer, 'salve');
    return localStorage.setItem('data_client', JSON.stringify(customer));

  }

  update(customer: Customer): void {
    console.log(customer, 'uptate');
    return localStorage.setItem('data_client', JSON.stringify(customer));
    // return this.http.put<Customer>(this.api, customer);
  }

  getAll(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.api);
  }

  getAllById(idCustomer: string): Observable<Customer> {
    return this.http.get<Customer>(this.api + idCustomer);
  }

}
