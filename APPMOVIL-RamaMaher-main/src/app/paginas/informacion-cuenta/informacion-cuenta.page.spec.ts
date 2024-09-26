import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InformacionCuentaPage } from './informacion-cuenta.page';

describe('InformacionCuentaPage', () => {
  let component: InformacionCuentaPage;
  let fixture: ComponentFixture<InformacionCuentaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InformacionCuentaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
