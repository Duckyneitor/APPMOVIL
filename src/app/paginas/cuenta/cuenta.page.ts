import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.page.html',
  styleUrls: ['./cuenta.page.scss'],
})
export class CuentaPage {

  password: string = "";
  email: string = "";
  mostrarContrasena: boolean = false;

  constructor() {}

  ngOnInit() {
    this.email = localStorage.getItem('email') || '';
    this.password = localStorage.getItem('password') || '';

  }
 
}