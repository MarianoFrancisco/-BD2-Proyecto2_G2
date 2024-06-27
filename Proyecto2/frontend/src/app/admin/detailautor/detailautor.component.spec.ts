import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailautorComponent } from './detailautor.component';

describe('DetailautorComponent', () => {
  let component: DetailautorComponent;
  let fixture: ComponentFixture<DetailautorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailautorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailautorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
