import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Importa el Router

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.page.html',
  styleUrls: ['./configuracion.page.scss'],
})
export class ConfiguracionPage implements OnInit {
  rangoAlarma: number = 500; // Valor por defecto para el rango de alarma
  notificacionesActivas: boolean = true; // Estado por defecto de las notificaciones

  constructor(private router: Router) {} // Inyecta el servicio Router

  ngOnInit() {
    // Método ngOnInit, que se ejecuta al inicializar el componente
  }

  abrirCentroControl() {
    console.log('Centro de Control abierto');
    // Lógica adicional para el centro de control
  }

  goToHome() {
    this.router.navigate(['/home']); // Navega a la página de inicio
  }
}
