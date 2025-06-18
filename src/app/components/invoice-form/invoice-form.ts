import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { JsonPipe } from '@angular/common';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';

import { SignaturePadField } from '../signature-pad-field/signature-pad-field';

import { Pdf } from '../../services/pdf/pdf';
import { Api } from '../../services/api/api';

import { ApiResponse } from '../../types/api';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-invoice-form',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    SignaturePadField,
    JsonPipe
  ],
  templateUrl: './invoice-form.html',
  styleUrl: './invoice-form.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InvoiceForm {

  private _fb = inject(FormBuilder);
  private _pdf = inject(Pdf);
  private _api = inject(Api);
  public apiResponse = signal<HttpResponse<ApiResponse> | null>(null);

  public invoiceForm = this._fb.group({
    personal: this._fb.group({
      fullName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)]],
      emailAddress: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.pattern(/^[\+]?[0-9]{0,3}\W?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im)]]
    }),
    invoice: this._fb.group({
      number: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]+$/)]],
      amount: [1, [Validators.required, Validators.min(1)]],
      date: [new Date(), [Validators.required]],
    }),
    signature: ['', [Validators.required]]
  });

  public async onSubmit(): Promise<void> {

    const pdfBlob = this._pdf.generateInvoicePdf(this.invoiceForm.value);
    const formData = new FormData();
    formData.append('file', pdfBlob, 'invoice.pdf');
    formData.append('metadata', JSON.stringify(this.invoiceForm.value));
    const response = await this._api.createInvoice(formData);

    if (response.body?.metadata) {
      response.body.metadata = JSON.parse(response.body.metadata);
      response.body.metadata.signature = '...';
    }

    this.apiResponse.set(response);

    if (response.status === 200) {
      this.invoiceForm.reset();
    }
  }

  public onExportNewInvoice(): void {
    this.invoiceForm.reset();
    this.apiResponse.set(null);
  }

}
