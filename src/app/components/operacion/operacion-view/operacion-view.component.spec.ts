import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperacionViewComponent } from './operacion-view.component';

xdescribe('OperacionViewComponent', () => {
  let component: OperacionViewComponent;
  let fixture: ComponentFixture<OperacionViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperacionViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OperacionViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
