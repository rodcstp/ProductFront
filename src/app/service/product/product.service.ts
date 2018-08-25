import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { RestService } from '../rest-service/rest.service';
import { Constant } from '../../constant/constant';
import { Observable } from 'rxjs/Observable';
import { Product } from '../../model/product.model';

@Injectable()
export class ProductService extends RestService {
  constructor(http: Http) { 
	  super(http); 
  }

  public getAll(): Observable<Array<Product>> {
	return this.get(Constant.BASE_URL + Constant.PRODUTO);
  }

  public getOne(id: String): Observable<Product> {
	return this.get(Constant.BASE_URL + Constant.PRODUTO + id);
  }

  public save(data: Product): Observable<Product> {
	return this.post(Constant.BASE_URL + Constant.PRODUTO, data);
  }

  public update(data: Product): Observable<Product> {
	return this.put(Constant.BASE_URL + Constant.PRODUTO, data);
  }


  public delete(id: string): Observable<any> {
	return this.remove(Constant.BASE_URL + Constant.PRODUTO, id);
  }
}