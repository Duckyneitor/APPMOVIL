import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  registerData = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phone: ''
  };

  constructor(private navCtrl: NavController) {}

  onSubmit(form: NgForm) {
    if (form.valid && this.registerData.password === this.registerData.confirmPassword) {
      console.log('Formulario válido, enviar datos al servidor');
      // Aquí iría la lógica para enviar los datos de registro al servidor
      this.navCtrl.navigateRoot('/home'); // Navega a la página de home si el registro es exitoso
    } else {
      console.log('Formulario inválido o contraseñas no coinciden');
    }
  }
}

