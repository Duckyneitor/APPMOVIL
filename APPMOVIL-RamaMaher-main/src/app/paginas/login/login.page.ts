import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { DataService } from '../../servicios/data.service'; 


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  loginData = {
    email: '',
    password: ''
  };

  constructor(private router: Router, private dataService: DataService,private storage: Storage) {} // Inyecta el servicio y Router

  onSubmit(form: NgForm) {
    if (form.valid) {
      console.log('Formulario válido, enviar datos al servidor');

      // Guarda el correo en el servicio
      this.dataService.setCorreo(this.loginData.email);
      this.dataService.setContrasena(this.loginData.password);
      // Redirige a la página principal
      this.router.navigate(['/home']);
      this.storage.set("SessionID", true);
    } else {
      console.log('Formulario inválido');
      
    }
  }
    async ngOnIit(){
      const storage = await this.storage.create();
    }
}
