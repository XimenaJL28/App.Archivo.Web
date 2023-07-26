import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentoPresentadoComponent } from './documento-presentado.component';

describe('DocumentoPresentadoComponent', () => {
  let component: DocumentoPresentadoComponent;
  let fixture: ComponentFixture<DocumentoPresentadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentoPresentadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentoPresentadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
