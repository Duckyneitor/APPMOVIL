import { Component, OnInit } from '@angular/core';
import { DataService } from '../../servicios/data.service'; // Importa el servicio

@Component({
  selector: 'app-informacion-cuenta',
  templateUrl: './informacion-cuenta.page.html',
  styleUrls: ['./informacion-cuenta.page.scss'],
})
export class InformacionCuentaPage implements OnInit {
  correo: string = ''; // Variable para almacenar el correo
  contrasena: string = 'miContraseñaSecreta'; // Valor predeterminado para la contraseña
  mostrarContrasena: boolean = false; // Controla la visibilidad de la contraseña

  constructor(private dataService: DataService) {} // Inyecta el servicio

  ngOnInit() {
    // Recupera el correo almacenado en el servicio
    this.correo = this.dataService.getCorreo();
    this.contrasena = this.dataService.getContrasena();

  }

  // Método para alternar la visibilidad de la contraseña
  toggleContrasena() {
    this.mostrarContrasena = !this.mostrarContrasena;
  }
}
