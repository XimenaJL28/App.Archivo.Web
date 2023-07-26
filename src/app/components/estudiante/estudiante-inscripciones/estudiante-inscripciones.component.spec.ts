import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstudianteInscripcionesComponent } from './estudiante-inscripciones.component';

describe('EstudianteInscripcionesComponent', () => {
  let component: EstudianteInscripcionesComponent;
  let fixture: ComponentFixture<EstudianteInscripcionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstudianteInscripcionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstudianteInscripcionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
