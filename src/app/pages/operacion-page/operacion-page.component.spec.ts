import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperacionPageComponent } from './operacion-page.component';

xdescribe('OperacionPageComponent', () => {
  let component: OperacionPageComponent;
  let fixture: ComponentFixture<OperacionPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperacionPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OperacionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
