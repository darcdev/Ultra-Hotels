import { Component, OnDestroy, OnInit } from '@angular/core';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { latLng, LayerGroup, tileLayer, Map, LatLng, Marker } from 'leaflet';

interface MapPoint {
  coords: LatLng;
  message: string;
}

import { HotelEntity } from '@/app/domain/entities/hotel.entity';
import { Observable, Subscription } from 'rxjs';
import { HotelState } from '@/app/presenter/state/hotels';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-map-hotels',
  standalone: true,
  imports: [LeafletModule],
  templateUrl: './map-hotels.component.html',
  styleUrl: './map-hotels.component.scss',
})
export class MapHotelsComponent implements OnInit, OnDestroy {
  map!: Map;
  markersLayer: LayerGroup = new LayerGroup();
  actualHotels: HotelEntity[] | null = null;
  actualHotels$!: Observable<HotelEntity[] | null>;

  actualHotelsSubscription: Subscription | null = null;
  points: MapPoint[] = [];

  options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 9,
        minZoom: 3,
      }),
    ],
    zoom: 5,
    center: latLng(4.5709, -74.2973),
  };

  constructor(private store: Store) {
    this.actualHotels$ = this.store.select(HotelState.getHotels);
  }

  ngOnInit() {
    this.actualHotelsSubscription = this.actualHotels$.subscribe(listHotels => {
      this.actualHotels = listHotels;
      this.addRandomPoints();
    });
  }

  onMapReady(map: Map) {
    this.map = map;
    this.markersLayer.addTo(this.map);
  }

  addPoints(points: MapPoint[]) {
    this.markersLayer.clearLayers();

    points.forEach(point => {
      const marker = new Marker(point.coords)
        .bindPopup(point.message)
        .openPopup();
      this.markersLayer.addLayer(marker);
    });
  }

  addRandomPoints() {
    this.points = (this.actualHotels ?? []).map(hotel => {
      return {
        coords: latLng(hotel?.latitude ?? 0, hotel?.longitude ?? 0),
        message: hotel?.name ?? '',
      };
    });
    this.addPoints(this.points);
  }

  ngOnDestroy() {
    this.actualHotelsSubscription?.unsubscribe();
  }
}
