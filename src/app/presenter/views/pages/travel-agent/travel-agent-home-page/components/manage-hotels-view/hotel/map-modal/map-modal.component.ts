import { Component } from '@angular/core';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import {
  icon,
  latLng,
  Marker,
  tileLayer,
  Map,
  LeafletMouseEvent,
} from 'leaflet';
import { ButtonComponent } from '@/app/presenter/views/shared/components/design-system/atoms/button/button.component';
import { Button } from 'primeng/button';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { IconComponent } from '@/app/presenter/views/shared/components/design-system/atoms/icon/icon.component';

@Component({
  selector: 'app-map-modal',
  standalone: true,
  imports: [LeafletModule, ButtonComponent, Button, IconComponent],
  templateUrl: './map-modal.component.html',
  styleUrl: './map-modal.component.scss',
})
export class MapModalComponent {
  map!: Map;
  marker!: Marker;
  latitude = 4.5709;
  longitude = -74.2973;

  constructor(private mapDialogRef: DynamicDialogRef) {}

  options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '© OpenStreetMap contributors',
      }),
    ],
    zoom: 15,
    center: latLng(this.latitude, this.longitude), // Coordenadas iniciales
  };

  onMapReady(map: Map) {
    this.map = map;

    this.map.on('click', (e: LeafletMouseEvent) => {
      const coords = e.latlng;
      this.placeMarker(coords);
    });
  }

  // eslint-disable-next-line no-undef
  placeMarker(coords: L.LatLng) {
    this.latitude = coords.lat;
    this.longitude = coords.lng;

    if (this.marker) {
      this.marker.setLatLng(coords);
    } else {
      this.marker = new Marker(coords, {
        icon: icon({
          iconSize: [40, 40],
          iconAnchor: [40, 40],
          iconUrl: '/assets/img/pinner.png',
          shadowUrl: 'assets/marker-shadow.png',
        }),
      }).addTo(this.map);
    }
  }

  selectMapLocation() {
    this.mapDialogRef.close({
      latitude: this.latitude,
      longitude: this.longitude,
    });
  }
}
