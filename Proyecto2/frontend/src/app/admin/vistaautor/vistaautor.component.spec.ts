import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaautorComponent } from './vistaautor.component';

describe('VistaautorComponent', () => {
  let component: VistaautorComponent;
  let fixture: ComponentFixture<VistaautorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VistaautorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VistaautorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
