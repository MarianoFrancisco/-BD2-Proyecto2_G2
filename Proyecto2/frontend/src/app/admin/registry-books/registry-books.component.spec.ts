import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistryBooksComponent } from './registry-books.component';

describe('RegistryBooksComponent', () => {
  let component: RegistryBooksComponent;
  let fixture: ComponentFixture<RegistryBooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegistryBooksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistryBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
