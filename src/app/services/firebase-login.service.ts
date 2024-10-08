import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FirebaseLoginService {

  constructor(private iniciarSession:AngularFireAuth, private router:Router) { }

  login(email:string, password:string){
    return this.iniciarSession.signInWithEmailAndPassword(email,password);
  }
  logout(){
    return this.iniciarSession.signOut().then(()=>{
      this.router.navigate(['/login']);
    })
  }
}
