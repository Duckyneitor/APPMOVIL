import { Component, OnInit } from '@angular/core';
import mapboxgl from 'mapbox-gl';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public map!: mapboxgl.Map;
  public style = 'mapbox://styles/mapbox/streets-v11';
  public markers: mapboxgl.Marker[] = []; // Lista de marcadores

  constructor() {}

  ngOnInit() {
    this.obtenerUbicacion();
  }

  ionViewWillEnter() {
    if (!this.map) {
      this.buildMap();
    }
  }

  async obtenerUbicacion() {
    try {
      const coordenadas = await Geolocation.getCurrentPosition();
      console.log('Latitud ', coordenadas.coords.latitude);
      console.log('Longitud ', coordenadas.coords.longitude);
    } catch (error) {
      console.error('Error al obtener la ubicación:', error);
    }
  }

  async buildMap() {
    const coordenadas = await Geolocation.getCurrentPosition();
    mapboxgl.accessToken = 'pk.eyJ1IjoibWtvbWluLTkzIiwiYSI6ImNtMmtra2twNzAyYTUyam40MHJ4ZWxndXMifQ.XUUZ8mOqe4ylOSoFvKZDHQ';

    this.map = new mapboxgl.Map({
      container: 'mapa-box',
      style: this.style,
      zoom: 14,
      center: [coordenadas.coords.longitude, coordenadas.coords.latitude],
    });

    this.map.on('click', (event) => {
      const { lng, lat } = event.lngLat;
      this.addMarker(lng, lat); // Agrega un marcador al hacer clic en el mapa
    });

    this.map.resize();
  }

  // Método para agregar un marcador
  addMarker(lng: number, lat: number) {
    const marker = new mapboxgl.Marker()
      .setLngLat([lng, lat]) // Coordenadas del marcador
      .addTo(this.map); // Añade el marcador al mapa

    this.markers.push(marker); // Lo guarda en la lista de marcadores

    // Permitir eliminar el marcador al hacer clic en él
    marker.getElement().addEventListener('click', () => {
      this.removeMarker(marker);
    });
  }

  // Método para eliminar un marcador
  removeMarker(marker: mapboxgl.Marker) {
    marker.remove(); // Elimina el marcador del mapa
    this.markers = this.markers.filter((m) => m !== marker); // Lo elimina de la lista de marcadores
  }
}
