import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TramiteInscripcionStepsComponent } from './tramite-inscripcion-steps.component';

xdescribe('TramiteInscripcionStepsComponent', () => {
  let component: TramiteInscripcionStepsComponent;
  let fixture: ComponentFixture<TramiteInscripcionStepsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TramiteInscripcionStepsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TramiteInscripcionStepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
