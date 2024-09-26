import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrearAlarmaPage } from './crear-alarma.page';

describe('CrearAlarmaPage', () => {
  let component: CrearAlarmaPage;
  let fixture: ComponentFixture<CrearAlarmaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearAlarmaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
