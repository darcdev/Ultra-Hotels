import { Component } from '@angular/core';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { latLng, tileLayer } from 'leaflet';

@Component({
  selector: 'app-map-hotels',
  standalone: true,
  imports: [LeafletModule],
  templateUrl: './map-hotels.component.html',
  styleUrl: './map-hotels.component.scss',
})
export class MapHotelsComponent {
  options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 9,
        minZoom: 3,
      }),
    ],
    zoom: 5,
    center: latLng(46.879966, -121.726909),
  };
}
