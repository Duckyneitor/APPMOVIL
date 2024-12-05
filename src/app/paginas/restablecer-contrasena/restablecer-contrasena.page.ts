import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Auth } from '@angular/fire/auth';
import { sendPasswordResetEmail } from 'firebase/auth';

@Component({
  selector: 'app-restablecer-contrasena',
  templateUrl: './restablecer-contrasena.page.html',
  styleUrls: ['./restablecer-contrasena.page.scss'],
})
export class RestablecerContrasenaPage {
  email: string = '';

  constructor(private auth: Auth, private toastController: ToastController) {}

  async resetPassword() {
    if (!this.email) {
      this.showToast('Por favor, ingresa tu correo electrónico.', 'danger');
      return;
    }

    try {
      await sendPasswordResetEmail(this.auth, this.email);
      this.showToast('Correo de restablecimiento enviado. Revisa tu bandeja.', 'success');
    } catch (error) {
      console.error('Error al enviar correo de restablecimiento:', error);
      this.showToast('No se pudo enviar el correo de restablecimiento. Intenta nuevamente.', 'danger');
    }
  }

  async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,
    });
    toast.present();
  }
}

