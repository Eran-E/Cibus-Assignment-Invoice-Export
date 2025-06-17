import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, input, signal, viewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

import SignaturePad from 'signature_pad';

@Component({
  selector: 'app-signature-pad-field',
  imports: [
    MatButtonModule,
    MatFormFieldModule,
  ],
  templateUrl: './signature-pad-field.html',
  styleUrl: './signature-pad-field.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignaturePadField implements AfterViewInit {

  public form = input<FormGroup>();
  public canvas = viewChild<ElementRef>('canvas');
  public signatureImg!: string;
  public signaturePad = signal<SignaturePad | null>(null);
  public isSignatureError = signal<boolean>(false);

  ngAfterViewInit(): void {
    this._createSignaturePad();
  }

  private _createSignaturePad(): void {
    this.signaturePad.set(
      new SignaturePad(
        this.canvas()?.nativeElement, {
          penColor: '#0000ff',
          backgroundColor: 'transparent',
        }
      )
    );
  }

  private _savePad(): void {
    const base64Data = this.signaturePad()?.toDataURL();
    this.signatureImg = base64Data || '';
    this.form()?.get('signature')?.setValue(this.signatureImg);
  }

  public clearPad(): void {
    this.signaturePad()?.clear();
    this.form()?.get('signature')?.setValue('');
  }

  public onMouseClick(event: Event): void {
    this._savePad();
  }

}
