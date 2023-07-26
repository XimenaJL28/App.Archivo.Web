import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentoPageComponent } from './documento-page.component';

xdescribe('DocumentoPageComponent', () => {
  let component: DocumentoPageComponent;
  let fixture: ComponentFixture<DocumentoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentoPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
