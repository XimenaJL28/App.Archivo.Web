import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TramitePresentadoComponent } from './tramite-presentado.component';

describe('TramitePresentadoComponent', () => {
  let component: TramitePresentadoComponent;
  let fixture: ComponentFixture<TramitePresentadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TramitePresentadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TramitePresentadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
