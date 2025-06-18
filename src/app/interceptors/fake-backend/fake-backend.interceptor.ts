import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { delay, of } from 'rxjs';

import { ApiResponse } from '../../types/api';

export const fakeBackendInterceptor: HttpInterceptorFn = (req, next) => {

  if (req.url.endsWith('/invoices') && req.method === 'POST') {

    const body = req.body as FormData;
    const file = body.get('file') as Blob;
    const metadataJson = body.get('metadata') as string;

    // Simulate wrapping both in a single object
    const responseBody: ApiResponse = {
      metadata: metadataJson,
      fileUrl: URL.createObjectURL(file),
      message: 'PDF and metadata received'
    };

    return of(new HttpResponse({
      status: 200,
      statusText: 'OK',
      body: responseBody,
    })).pipe(
      delay(500)
    );

  }

  return next(req);

};
