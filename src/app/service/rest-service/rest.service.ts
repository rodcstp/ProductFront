import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class RestService {
  headers: Headers;

  constructor(public http: Http) {
  }

  getRequestOptions() {
    const options = new RequestOptions({ headers: this.headers });

    if (!options.headers) {
      options.headers = new Headers();
    }

    if (!options.headers.has('Content-Type')) {
      options.headers.set('Content-Type', 'application/json');
    }

    if (!options.headers.has('Accept')) {
      options.headers.set('Accept', 'application/json');
    }

    return options;
  }

  get(url: string, params?: any[]): Observable<any> {
    if (params === undefined) {
      return this.http.get(url, this.optionsHeader()).map(this.extractData).catch(this.handleError.bind(this));
    } else {
      const param = new URLSearchParams();

      params.forEach(element => {
        param.set(element.paramName, element.param);
      });

      return this.http.get(url, this.optionsHeader(param)).map(this.extractData).catch(this.handleError.bind(this));
    }
  }

  post(url: string, payload?: any): Observable<any> {
    const body = payload ? JSON.stringify(payload) : null;
    return this.http.post(url, body, this.optionsHeader()).map(this.extractData).catch(this.handleError.bind(this));
  }

  postFile(url: string, param: any): Observable<any> {
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    const options = new RequestOptions({ headers: headers });
    return this.http.post(url, param, options).map(this.extractData).catch(this.handleError.bind(this));
  }

  put(url: string, param: any): Observable<any> {
    const body = JSON.stringify(param);
    return this.http.put(url, body, this.getRequestOptions()).map(this.extractData).catch(this.handleError.bind(this));
  }

  patch(url: string, param: any): Observable<any> {
    const body = JSON.stringify(param);
    return this.http.patch(url, body, this.getRequestOptions()).map(this.extractData).catch(this.handleError.bind(this));
  }

  delete(url: string, param: any): Observable<any> {
    const params: URLSearchParams = new URLSearchParams();
    for (const key in param) {
      if (param.hasOwnProperty(key)) {
        const val = param[key];
        params.set(key, val);
      }
    }
    const options = this.getRequestOptions();
    options.search = params;

    return this.http.delete(url, this.getRequestOptions()).map(this.extractData).catch(this.handleError.bind(this));
  }

  remove(url: string, val: string): Observable<any> {
    return this.http.delete(url + '/' + val, this.getRequestOptions()).map(this.extractData).catch(this.handleError.bind(this));
  }

  public extractData(res: Response) {
    try {
      return res.json();
    } catch (error) {
      return res;
    }
  }

  private checkJson(resp: Response | any): boolean {
    try {
      resp.json();
      return true;
    } catch (err) {
      return false;
    }
  }

  public handleError(error: Response | any) {
    console.log(error);
    let errMsg: string;

    if (error instanceof Response && this.checkJson(error)) {
      const body = error.json() || '';

      if (body instanceof Array && body.length > 0) {
        errMsg = body[0];
      } else {
        errMsg = body.message;
      }
    } else if (error._body) {
      errMsg = error._body;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }

    if (errMsg === undefined) {
      errMsg = 'Erro com a conexão';
    }

    return Observable.throw(errMsg);
  }

  private optionsHeader(params?: URLSearchParams): RequestOptions {
    const options = this.getRequestOptions();
    if (params !== null) {
      options.params = params;
    }

    return this.getRequestOptions();
  }
}