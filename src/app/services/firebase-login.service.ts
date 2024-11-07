import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FirebaseLoginService {

  constructor(private iniciarSession:AngularFireAuth, private router:Router, private firestore:AngularFirestore) { }

  login(email:string, password:string){
    return this.iniciarSession.signInWithEmailAndPassword(email,password);
  }
  logout(){
    return this.iniciarSession.signOut().then(()=>{
      this.router.navigate(['/login']);
    })
  }

  async create_user(nombre: string, email: string, password: string, telefono: string){
    const userCredential = await this.iniciarSession.createUserWithEmailAndPassword(email, password);
    const uid= userCredential.user?.uid;
    await this.firestore.doc(`users/${email}`).set({
      nombre:nombre,
      email:email,
      telefono:telefono,
      password:password,
      uid:uid
    });
    return userCredential;
  }



}
