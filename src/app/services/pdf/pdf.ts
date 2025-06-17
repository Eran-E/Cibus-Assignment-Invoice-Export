import { Injectable } from '@angular/core';

import { jsPDF } from "jspdf";

@Injectable({
  providedIn: 'root'
})
export class Pdf {

  private readonly _doc: jsPDF = new jsPDF();
  private readonly _fontSize1 = 16;
  private readonly _fontSize2 = 32;
  private readonly _spacing1 = 10;
  private readonly _spacing2 = 20;
  private readonly _valueXSpacing = 45;

  constructor() {}

  private capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  private _dateFormat(dateStr: string): string {

    const date = new Date(dateStr);
    
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;

  }

  private _generateText({text, x, y, isBold = false, fontSize = this._fontSize1}: {text: string, x: number, y: number, isBold?: boolean, fontSize?: number}): {x: number, y: number} {

    this._doc.setFontSize(fontSize);
    this._doc.setFont('helvetica', isBold ? 'bold' : 'normal');
    this._doc.text(text, x, y);

    return {
      x,
      y
    }

  }

  private _generateGroup({x, y, fieldsGroupTitle, value}: {x: number, y: number, fieldsGroupTitle: string, value: any}): {x: number, y: number} {

    // Fields Group title
    ({x, y} = this._generateText({text: fieldsGroupTitle + ' Details:', x, y: y += this._spacing2, isBold: true}));

    for (const field of Object.keys(value)) {
      // Reset x
      x = this._spacing2 + this._spacing1;

      // Field title
      const fieldLabel = field + ': ';
      ({x, y} = this._generateText({text: fieldLabel, x, y: y += this._spacing1, isBold: true}));

      // Field value
      if (field === 'date') {
        ({x, y} = this._generateText({text: this._dateFormat(value[field].toString()), x: x + this._valueXSpacing, y, isBold: false}));
      } else {
        ({x, y} = this._generateText({text: value[field].toString(), x: x + this._valueXSpacing, y, isBold: false}));
      }
    }

    // Reset x
    x = this._spacing2;

    return {
      x,
      y
    }

  }

  public generateInvoicePdf(pdfData: any): void {

    let {x, y} = {x: this._spacing2, y: this._spacing2};

    // Main title
    ({x, y} = this._generateText({text: 'Invoice', x, y, isBold: true, fontSize: this._fontSize2}));


    for (const group of Object.keys(pdfData)) {

      const fieldsGroupTitle = this.capitalizeFirstLetter(group);

      const value = pdfData[group];

      if (group === 'signature') {
        ({x, y} = this._generateText({text: fieldsGroupTitle + ':', x, y: y += this._spacing2, isBold: true}));
        this._doc.addImage(value, 'PNG', this._spacing2, y + this._spacing2, 50, 50);
      }
      else {
        ({x, y} = this._generateGroup({x, y, fieldsGroupTitle, value}));
      }
    }

    this._doc.save('invoice.pdf');

  }

}
