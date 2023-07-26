import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TramiteHeaderComponent } from './tramite-header.component';

describe('TramiteHeaderComponent', () => {
  let component: TramiteHeaderComponent;
  let fixture: ComponentFixture<TramiteHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TramiteHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TramiteHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
