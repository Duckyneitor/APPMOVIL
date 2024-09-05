import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'https://tu-backend-api.com'; // Cambia esto por la URL de tu backend

  constructor(private http: HttpClient) {}

  // Método para enviar el correo de restablecimiento de contraseña
  sendPasswordResetEmail(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/send-reset-password-email`, { email });
  }

  // Otros métodos de autenticación pueden ser añadidos aquí
}

