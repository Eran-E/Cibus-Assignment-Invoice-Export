import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';

import { SignaturePadField } from '../signature-pad-field/signature-pad-field';

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
    SignaturePadField
  ],
  templateUrl: './invoice-form.html',
  styleUrl: './invoice-form.scss',
  standalone: true
})
export class InvoiceForm {

  private _fb = inject(FormBuilder);

  public invoiceForm = this._fb.group({
    personal: this._fb.group({
      fullName: ['', [Validators.required]],
      emailAddress: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.pattern(/^\d{10}$/)]]
    }),
    invoice: this._fb.group({
      number: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]+$/)]],
      amount: [1, [Validators.required, Validators.min(1)]],
      date: [new Date(), [Validators.required]],
    }),
    signature: ['', [Validators.required]]
  });

  public onSignaturePadOutput(signatureImg: string): void {
    this.invoiceForm.get('signature')?.setValue(signatureImg);
  }

  public onSubmit(): void {
    console.log(this.invoiceForm.value);
  }

}
