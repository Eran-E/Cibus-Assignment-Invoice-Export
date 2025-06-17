import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { delay, of } from 'rxjs';

export const fakeBackendInterceptor: HttpInterceptorFn = (req, next) => {

  if (req.url.endsWith('/invoices') && req.method === 'POST') {

    const body = req.body as FormData;

    const file = body.get('file');
    const metadataJson = body.get('metadata') as string;
    const metadata = JSON.parse(metadataJson);

    console.log('PDF file:', file);
    console.log('Metadata:', metadata);

    return of(
      new HttpResponse({
        status: 200,
        body: { message: 'Mock upload received file and metadata' }
      })
    ).pipe(delay(1000));
  }

  return next(req);

};
