import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private correo: string = ''; // Variable para almacenar el correo
  private contrasena: string = ''; // Variable para almacenar la contraseña

  constructor() {}

  // Método para establecer el correo
  setCorreo(correo: string) {
    this.correo = correo;
  }

  // Método para obtener el correo
  getCorreo(): string {
    return this.correo;
  }

  // Método para establecer la contraseña
  setContrasena(contrasena: string) {
    this.contrasena = contrasena;
  }

  // Método para obtener la contraseña
  getContrasena(): string {
    return this.contrasena;
  }
}
