import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';


@Component({
  selector: 'app-crear-alarma',
  templateUrl: './crear-alarma.page.html',
  styleUrls: ['./crear-alarma.page.scss'],
})
export class CrearAlarmaPage implements OnInit {
  nombre: string = '';
  usuario: string = '';
  telefono: string = '';

  constructor(private route: Router, private storage:Storage) { }

  async ngOnInit() {
    const storage = await this.storage.create();
    this.usuario = await storage.get('email');
    this.nombre = await storage.get('nombre');
    this.telefono = await storage.get('telefono');
  }

  home() {
    console.log("Home");
    this.route.navigate(["/home"]);
  }

  logout() {
    this.storage.clear();
    console.log("Login");
    this.route.navigate(["/login"]);
  }
}