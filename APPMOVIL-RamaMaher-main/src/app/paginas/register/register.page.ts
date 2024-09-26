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

   // Esta función permite solo números y mantiene el prefijo +56
   enforceNumeric(event: any) {
    let input = event.target.value;
    input = input.replace(/\D/g, ''); // Eliminar todo lo que no sea número
    if (!input.startsWith('56')) {
      input = '56' + input;  // Asegurarse de que el prefijo se mantenga
    }
    event.target.value = '+' + input;
    this.registerData.phone = '+' + input; // Actualizar el valor de ngModel
  }

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



