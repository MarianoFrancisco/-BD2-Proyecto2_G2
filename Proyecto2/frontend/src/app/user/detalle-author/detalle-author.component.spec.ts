import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleAuthorComponent } from './detalle-author.component';

describe('DetalleAuthorComponent', () => {
  let component: DetalleAuthorComponent;
  let fixture: ComponentFixture<DetalleAuthorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetalleAuthorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleAuthorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
