import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignaturePadField } from './signature-pad-field';

describe('SignaturePadField', () => {
  let component: SignaturePadField;
  let fixture: ComponentFixture<SignaturePadField>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignaturePadField]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignaturePadField);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
