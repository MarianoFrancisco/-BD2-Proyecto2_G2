import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetaillibroComponent } from './detaillibro.component';

describe('DetaillibroComponent', () => {
  let component: DetaillibroComponent;
  let fixture: ComponentFixture<DetaillibroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetaillibroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetaillibroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
