import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';


@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.page.html',
  styleUrls: ['./cuenta.page.scss'],
})
export class CuentaPage implements OnInit {

  password: string = "";
  nombre: string = "";
  usuario: string = "";
  telefono: string = "";


  constructor(private storage: Storage) {}

  async ngOnInit() {
    const storage = await this.storage.create();
    this.usuario = await storage.get('email');
    this.nombre = await storage.get('nombre');
    this.telefono = await storage.get('telefono');
    this.password = await storage.get('password');
  }

 
}