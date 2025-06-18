import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';

import { ApiResponse } from '../../types/api';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Api {

  private readonly _http = inject(HttpClient);
  private readonly _apiUrl = environment.apiUrl;

  constructor() { }

  public async createInvoice(formData: FormData): Promise<HttpResponse<ApiResponse>> {

    return await lastValueFrom(
      this._http.post<ApiResponse>(this._apiUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        observe: 'response'
      })
    );
 
  }
  
}
