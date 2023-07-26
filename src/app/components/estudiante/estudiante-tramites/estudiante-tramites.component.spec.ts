import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstudianteTramitesComponent } from './estudiante-tramites.component';

describe('EstudianteTramitesComponent', () => {
  let component: EstudianteTramitesComponent;
  let fixture: ComponentFixture<EstudianteTramitesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstudianteTramitesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstudianteTramitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
