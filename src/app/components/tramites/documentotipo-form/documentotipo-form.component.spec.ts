import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentotipoFormComponent } from './documentotipo-form.component';

describe('DocumentotipoFormComponent', () => {
  let component: DocumentotipoFormComponent;
  let fixture: ComponentFixture<DocumentotipoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentotipoFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentotipoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
