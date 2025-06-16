import { AfterViewInit, Component, ElementRef, output, signal, viewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import SignaturePad from 'signature_pad';

@Component({
  selector: 'app-signature-pad-field',
  imports: [
    MatButtonModule,
  ],
  templateUrl: './signature-pad-field.html',
  styleUrl: './signature-pad-field.scss',
  standalone: true
})
export class SignaturePadField implements AfterViewInit {

  public output = output<string>();
  public canvas = viewChild<ElementRef>('canvas');
  public signatureImg!: string;
  public signaturePad = signal<SignaturePad | null>(null);

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
    this.output.emit(this.signatureImg);
  }

  public clearPad(): void {
    this.signaturePad()?.clear();
    this.output.emit('');
  }

  public onMouseClick(event: Event): void {
    this._savePad();
  }

}
