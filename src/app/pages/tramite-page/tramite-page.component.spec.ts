import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TramitePageComponent } from './tramite-page.component';

xdescribe('TramitePageComponent', () => {
  let component: TramitePageComponent;
  let fixture: ComponentFixture<TramitePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TramitePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TramitePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
