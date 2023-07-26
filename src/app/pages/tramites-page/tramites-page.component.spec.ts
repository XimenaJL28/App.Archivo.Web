import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TramitesPageComponent } from './tramites-page.component';

xdescribe('TramitesPageComponent', () => {
  let component: TramitesPageComponent;
  let fixture: ComponentFixture<TramitesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TramitesPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TramitesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
