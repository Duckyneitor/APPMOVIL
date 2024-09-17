import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  loginData = {
    email: '',
    password: ''
  };

  constructor(private navCtrl: NavController) {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      console.log('Formulario válido, enviar datos al servidor');
      this.navCtrl.navigateRoot('/home'); // Navega a la página de home si el login es exitoso
    } else {
      console.log('Formulario inválido');
    }
  }
}



