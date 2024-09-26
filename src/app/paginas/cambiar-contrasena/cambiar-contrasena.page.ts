import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-cambiar-contrasena',
  templateUrl: './cambiar-contrasena.page.html',
  styleUrls: ['./cambiar-contrasena.page.scss'],
})
export class CambiarContrasenaPage {
  nombre: string = "";
  usuario: string = "";
  password: string = "";
  isModalOpen = false;

  constructor(public mensaje: ToastController, private route: Router, public alerta: AlertController) { }


    // Valida que el email tenga @ y .
  validarEmail(email: string): boolean {
     const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
     return emailPattern.test(email);
  }


  async mensajeExito() {
    const toast = await this.mensaje.create({
      message: 'Inicio de sesión exitoso',
      duration: 2000
    });
    toast.present();
  }

  ingresar() {
    if (this.usuario === "") {
      // Muestra un mensaje si los campos están vacíos
      console.log("No pueden estar los campos vacíos");
      this.MensajeError('Por favor, complete todos los campos.');
    } else if (!this.validarEmail(this.usuario)) {
      // Verifica que el email sea válido
      console.log("Correo electrónico no válido");
      this.MensajeError('Por favor, ingrese un correo electrónico válido.');
    } else {
      // Si todo está bien, inicia sesión
      console.log("Inicio exitoso");
      this.mensajeExito();
    }
  }
  async MensajeError(mensaje: string) {
    const alert = await this.alerta.create({
      header: 'Error',
      subHeader: 'Error en el inicio de sesión',
      message: mensaje,
      buttons: ['Aceptar']
    });
    await alert.present();
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
}
