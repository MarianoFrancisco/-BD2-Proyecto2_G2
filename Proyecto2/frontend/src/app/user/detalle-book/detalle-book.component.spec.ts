import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleBookComponent } from './detalle-book.component';

describe('DetalleBookComponent', () => {
  let component: DetalleBookComponent;
  let fixture: ComponentFixture<DetalleBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetalleBookComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
