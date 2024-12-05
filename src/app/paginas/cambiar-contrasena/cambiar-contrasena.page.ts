import { Component } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { updatePassword } from 'firebase/auth';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-cambiar-contrasena',
  templateUrl: './cambiar-contrasena.page.html',
  styleUrls: ['./cambiar-contrasena.page.scss'],
})
export class CambiarContrasenaPage {
  newPassword: string = '';

  constructor(private auth: Auth, private toastController: ToastController) {}

  async changePassword() {
    if (!this.newPassword) {
      this.showToast('Por favor, ingresa una nueva contraseña.', 'danger');
      return;
    }

    try {
      const user = this.auth.currentUser;
      if (!user) {
        this.showToast('No hay usuario autenticado. Por favor, inicia sesión.', 'danger');
        return;
      }

      await updatePassword(user, this.newPassword);
      this.showToast('Contraseña actualizada exitosamente.', 'success');
    } catch (error) {
      console.error('Error al actualizar la contraseña:', error);
      this.showToast('No se pudo actualizar la contraseña. Intenta nuevamente.', 'danger');
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
