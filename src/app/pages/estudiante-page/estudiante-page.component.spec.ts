import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstudiantePageComponent } from './estudiante-page.component';

xdescribe('EstudiantePageComponent', () => {
  let component: EstudiantePageComponent;
  let fixture: ComponentFixture<EstudiantePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstudiantePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstudiantePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
