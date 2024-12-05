import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class FirebaseLoginService {
  private secretKey: string = 'mi-clave-secreta'; // ¡Almacena esto de forma segura!

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private firestore: AngularFirestore
  ) {}

  // Método para encriptar datos
  private encryptData(data: string): string {
    return CryptoJS.AES.encrypt(data, this.secretKey).toString();
  }

  // Método para desencriptar datos (si necesitas leerlos desencriptados)
  private decryptData(data: string): string {
    return CryptoJS.AES.decrypt(data, this.secretKey).toString(CryptoJS.enc.Utf8);
  }

  login(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.afAuth.signOut().then(() => {
      this.router.navigate(['/login']);
    });
  }

  async create_user(nombre: string, email: string, password: string, telefono: string) {
    const userCredential = await this.afAuth.createUserWithEmailAndPassword(email, password);
    const uid = userCredential.user?.uid;

    // Encriptar la contraseña antes de almacenarla en Firestore
    const encryptedPassword = this.encryptData(password);

    await this.firestore.doc(`users/${uid}`).set({
      nombre: nombre,
      email: email,
      telefono: telefono,
      password: encryptedPassword, // Guardamos la contraseña encriptada
      uid: uid,
    });

    return userCredential;
  }
}
