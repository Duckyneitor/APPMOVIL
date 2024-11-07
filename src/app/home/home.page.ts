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
  private marcador!: mapboxgl.Marker;
  private radioMetros: number = 500; // Radio en metros
  private objetivo!: [number, number]; // Coordenadas objetivo

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
    const coordenadas = Geolocation.getCurrentPosition();
    mapboxgl.accessToken = 'pk.eyJ1IjoibWtvbWluLTkzIiwiYSI6ImNtMmtra2twNzAyYTUyam40MHJ4ZWxndXMifQ.XUUZ8mOqe4ylOSoFvKZDHQ';
    this.map = new mapboxgl.Map({
      container: 'mapa-box',
      style: this.style,
      zoom: 14,
      center: [(await coordenadas).coords.longitude, (await coordenadas).coords.latitude],
    });
    this.map.resize();
  }

  async marcarUbicacion() {
    try {
      const coordenadas = await Geolocation.getCurrentPosition();
      const lat = coordenadas.coords.latitude;
      const lng = coordenadas.coords.longitude;

      // Guardar la ubicación objetivo
      this.objetivo = [lng, lat];

      // Crear el marcador
      if (this.marcador) this.marcador.remove(); // Remover marcador anterior si existe
      this.marcador = new mapboxgl.Marker().setLngLat(this.objetivo).addTo(this.map);

      // Dibujar un círculo para el radio
      this.map.addSource('circle', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: this.objetivo
              },
              properties: null
            }
          ]
        }
      });

      this.map.addLayer({
        id: 'circle-radius',
        type: 'circle',
        source: 'circle',
        paint: {
          'circle-radius': this.radioMetros / 2, // Radio en metros
          'circle-color': '#007cbf',
          'circle-opacity': 0.4
        }
      });

      // Comenzar a verificar si se está en el radio
      this.verificarUbicacion();
    } catch (error) {
      console.error('Error al marcar la ubicación:', error);
    }
  }

  async verificarUbicacion() {
    setInterval(async () => {
      const coordenadas = await Geolocation.getCurrentPosition();
      const lat = coordenadas.coords.latitude;
      const lng = coordenadas.coords.longitude;

      const distancia = this.calcularDistancia([lng, lat], this.objetivo);

      if (distancia <= this.radioMetros) {
        this.sonarAlarma();
      }
    }, 5000); // Verificar cada 5 segundos
  }

  calcularDistancia(coord1: [number, number], coord2: [number, number]): number {
    const R = 6371e3; // Radio de la Tierra en metros
    const φ1 = coord1[1] * (Math.PI / 180);
    const φ2 = coord2[1] * (Math.PI / 180);
    const Δφ = (coord2[1] - coord1[1]) * (Math.PI / 180);
    const Δλ = (coord2[0] - coord1[0]) * (Math.PI / 180);

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distancia = R * c; // Distancia en metros
    return distancia;
  }

  sonarAlarma() {
    const audio = new Audio('path/to/your/alarm-sound.mp3'); // Ruta al sonido de alarma
    audio.play();
    alert("¡Has entrado en el área!");
  }
}
