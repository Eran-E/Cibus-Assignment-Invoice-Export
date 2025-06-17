import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Api {

  private readonly _http = inject(HttpClient);
  private readonly _apiUrl = environment.apiUrl;

  constructor() { }

  public createInvoice(formData: FormData): void {
    this._http.post<any>(this._apiUrl, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).subscribe({
      next: (res) => {
        console.log('res', res);
      },
      error: (err) => {
        console.error('err', err);
      }
    });
  }
  
}
