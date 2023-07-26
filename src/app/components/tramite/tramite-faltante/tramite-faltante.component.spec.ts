import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TramiteFaltanteComponent } from './tramite-faltante.component';

describe('TramiteFaltanteComponent', () => {
  let component: TramiteFaltanteComponent;
  let fixture: ComponentFixture<TramiteFaltanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TramiteFaltanteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TramiteFaltanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
