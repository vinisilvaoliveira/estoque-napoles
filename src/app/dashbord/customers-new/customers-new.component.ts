import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {map, take} from 'rxjs/operators';
import {CustomerService} from '../../shared/services/customer.service';
import {Customer} from '../../shared/models/customer';

@Component({
  selector: 'app-customers-new',
  templateUrl: './customers-new.component.html',
  styleUrls: ['./customers-new.component.scss']
})
export class CustomersNewComponent implements OnInit {
  public formBrand: FormGroup = new FormGroup({});
  public customer!: Customer;
  data_client: Customer[] = [];
  hasError!: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private customerService: CustomerService
  ) {
  }

  ngOnInit(): void {
    if (localStorage.getItem("logado") !== 'italo') {
      this.router.navigateByUrl('/login');
    }
    this.createForm();
    this.data_client = JSON.parse(localStorage.getItem("data_client"));
    if (this.router.url.includes('clientes/cliente')) {
      this.route.params.pipe(
        map(p => p.id)
      ).subscribe(idRota => {
        if (this.data_client) {
         this.customer = this.data_client.find(e =>  e.id.toString() === idRota);
        } else {
          this.data_client = [];
          console.log('passou aui ?');
        }
        this.createForm();
      });
    }else {
      if (this.data_client === null) {
        this.data_client = [];
      }
    }

  }

  private createForm(): void {
    this.formBrand = this.formBuilder.group({
      id: new FormControl(this.customer?.id ? this.customer.id : null),
      name: new FormControl(this.customer?.name ? this.customer.name : '', Validators.required),
      cod: new FormControl(this.customer?.cod ? this.customer.cod : '', Validators.required),
      lote: new FormControl(this.customer?.lote ? this.customer.lote : '', Validators.required),
      validade: new FormControl(this.customer?.validade ? this.customer.validade : '', Validators.required),
      total: new FormControl(this.customer?.total ? this.customer.total : '', Validators.required),
    });
  }

  cssError(field: any): any {
    return {
      'is-invalid': field.errors && field.touched
    };
  }

  save(): void {
    if (this.customer) {
        this.data_client = this.data_client.map(e => {
          if (e.id === this.formBrand.value.id) {
            e = this.formBrand.value;
          }
          return e;
        })
    } else {
      const newClient = this.formBrand.value;
      console.log(this.data_client);

      newClient.id = this.data_client.length + 1;
      this.data_client.push(newClient);
    }
    localStorage.setItem('data_client', JSON.stringify(this.data_client));
    this.router.navigateByUrl('/clientes');
  }

}
