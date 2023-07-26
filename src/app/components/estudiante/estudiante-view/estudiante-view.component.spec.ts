import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstudianteViewComponent } from './estudiante-view.component';

xdescribe('EstudianteViewComponent', () => {
  let component: EstudianteViewComponent;
  let fixture: ComponentFixture<EstudianteViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstudianteViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstudianteViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
