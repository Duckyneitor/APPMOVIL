import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { FirebaseLoginService } from 'src/app/services/firebase-login.service';

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

  constructor(public mensaje: ToastController, private route: Router, public alerta: AlertController, private storage: Storage, private access:FirebaseLoginService) { }

  async ngOnInit() {
    const storage = await this.storage.create();
  }

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
  async crear_usuario(){
    await this.access.create_user(this.nombre, this.usuario, this.password, this.telefono);
    if (this.nombre === "" || this.usuario === "" || this.password === "" || this.telefono === "") {
      this.MensajeError('Por favor, complete todos los campos.');
    } else if (!this.validarEmail(this.usuario)) {
      this.MensajeError('Por favor, ingrese un correo electrónico válido.');
    } else if (!this.validarTelefono(this.telefono)) {
      this.MensajeError('El teléfono debe contener exactamente 9 dígitos numéricos.');
    } else if (!this.validarPassword(this.password)) {
      this.MensajeError('La contraseña debe tener al menos 6 caracteres.');
    } else {
      this.mensajeExito();
      this.storage.set('nombre', this.nombre);
      this.storage.set('email', this.usuario);
      this.storage.set('password', this.password);
      this.storage.set('telefono', this.telefono);
      this.storage.set('SessionID', true);
      this.route.navigate(["/home"]);
    }
  }
  registrarse() {
    if (this.nombre === "" || this.usuario === "" || this.password === "" || this.telefono === "") {
      this.MensajeError('Por favor, complete todos los campos.');
    } else if (!this.validarEmail(this.usuario)) {
      this.MensajeError('Por favor, ingrese un correo electrónico válido.');
    } else if (!this.validarTelefono(this.telefono)) {
      this.MensajeError('El teléfono debe contener exactamente 9 dígitos numéricos.');
    } else if (!this.validarPassword(this.password)) {
      this.MensajeError('La contraseña debe tener al menos 5 caracteres.');
    } else {
      this.mensajeExito();
      this.storage.set('nombre', this.nombre);
      this.storage.set('email', this.usuario);
      this.storage.set('telefono', this.telefono);
      this.storage.set('password', this.password);
      this.storage.set('SessionID', true);
      this.route.navigate(["/home"]);
    }
  }

  // Redirige al login si se cancela
  login() {
    this.route.navigate(["/login"]);
  }
}