import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  nombre: string = "";
  usuario: string = "";  // Email
  password: string = "";
  telefono: string = "";

  constructor(public mensaje: ToastController, private route: Router, public alerta: AlertController) { }

  ngOnInit() {}

  // Valida que el email tenga @ y .
  validarEmail(email: string): boolean {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }

  // Valida que el teléfono tenga exactamente 9 dígitos y solo contenga números
  validarTelefono(telefono: string): boolean {
    const telefonoPattern = /^[0-9]{9}$/;
    return telefonoPattern.test(telefono);
  }

  // Valida que la contraseña tenga al menos 5 caracteres
  validarPassword(password: string): boolean {
    return password.length >= 5;
  }

  // Mensaje de éxito
  async mensajeExito() {
    const toast = await this.mensaje.create({
      message: 'Registro de Usuario exitoso',
      duration: 2000
    });
    toast.present();
  }

  // Mostrar mensaje de error
  async MensajeError(mensaje: string) {
    const alert = await this.alerta.create({
      header: 'Error',
      subHeader: 'Error en el registro',
      message: mensaje,
      buttons: ['Aceptar']
    });
    await alert.present();
  }

  // Proceso de registro
  registrarse() {
    if (this.nombre === "" || this.usuario === "" || this.password === "" || this.telefono === "") {
      // Verifica que todos los campos estén llenos
      this.MensajeError('Por favor, complete todos los campos.');
    } else if (!this.validarEmail(this.usuario)) {
      // Verifica si el email es válido
      this.MensajeError('Por favor, ingrese un correo electrónico válido.');
    } else if (!this.validarTelefono(this.telefono)) {
      // Verifica si el teléfono tiene 9 dígitos
      this.MensajeError('El teléfono debe contener exactamente 9 dígitos numéricos.');
    } else if (!this.validarPassword(this.password)) {
      // Verifica si la contraseña tiene al menos 5 caracteres
      this.MensajeError('La contraseña debe tener al menos 5 caracteres.');
    } else {
      // Si todo es válido, registra el usuario
      this.mensajeExito();
      
      // Guarda los datos en localStorage
      localStorage.setItem('nombre', this.nombre);
      localStorage.setItem('email', this.usuario);
      localStorage.setItem('telefono', this.telefono);
      
      // Evita guardar la contraseña en texto plano en localStorage para mayor seguridad
      // localStorage.setItem('password', this.password);  // No recomendado

      // Redirige a la página principal
      this.route.navigate(["/home"]);
    }
  }

  // Redirige al login si se cancela
  login() {
    this.route.navigate(["/login"]);
  }
}