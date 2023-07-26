import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentoOperacionesComponent } from './documento-operaciones.component';

describe('DocumentoOperacionesComponent', () => {
  let component: DocumentoOperacionesComponent;
  let fixture: ComponentFixture<DocumentoOperacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentoOperacionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentoOperacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
