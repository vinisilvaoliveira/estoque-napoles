import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Numbers} from '../models/numbers';

@Injectable({
  providedIn: 'root'
})
export class NumberService {
  api: string = environment.WALLI_API + 'numbers/';

  constructor(
    private http: HttpClient
  ) {
  }

  getAll(): Observable<Numbers[]> {
    return this.http.get<Numbers[]>(this.api);
  }

  getAlByCustumer(idCustomer: string): Observable<Numbers[]> {
    return this.http.get<Numbers[]>(this.api + 'customer/' + idCustomer);
  }

  buyNumber(idNumber: string, idCustomer: string): Observable<Numbers> {
    return this.http.put<Numbers>(this.api + 'buy/' + idNumber + '/customer/' + idCustomer, {});
  }
  removeCustomer(idNumber: string): Observable<Numbers> {
    return this.http.put<Numbers>(this.api + 'remove/' + idNumber, {});
  }
}
