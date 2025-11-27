import { Component, OnInit, OnDestroy } from '@angular/core';
import mapboxgl from 'mapbox-gl';
import { MapboxOverlay } from '@deck.gl/mapbox';
import { ScatterplotLayer, IconLayer } from '@deck.gl/layers';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'DeckGL IconLayer - Angular 18 (Working)';
  private map: mapboxgl.Map | null = null;
  private overlay: MapboxOverlay | null = null;

  // Test data - three points on the map
  private readonly testData = [
    { position: [-122.4, 37.8], name: 'Point 1' },
    { position: [-122.42, 37.82], name: 'Point 2' },
    { position: [-122.38, 37.78], name: 'Point 3' }
  ];

  ngOnInit() {
    this.initializeMap();
  }

  ngOnDestroy() {
    this.map?.remove();
  }

  private initializeMap() {
    // TODO: Replace with your own Mapbox access token from https://account.mapbox.com/
    const MAPBOX_ACCESS_TOKEN = 'YOUR_MAPBOX_ACCESS_TOKEN_HERE';

    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/light-v11',
      center: [-122.4, 37.8],
      zoom: 12,
      accessToken: MAPBOX_ACCESS_TOKEN
    });

    this.map.on('load', () => {
      console.log('✅ Mapbox map loaded (Angular 18)');
      this.initializeDeckGL();
    });
  }

  private initializeDeckGL() {
    console.log('🎨 Initializing DeckGL layers (Angular 18)...');

    const layers = [
      // ScatterplotLayer - should work (baseline/control)
      new ScatterplotLayer({
        id: 'scatterplot-layer',
        data: this.testData,
        getPosition: (d: any) => d.position,
        getFillColor: [255, 0, 0, 200],
        getRadius: 100,
        pickable: true
      }),

      // IconLayer - THIS WORKS in Angular 18!
      new IconLayer({
        id: 'icon-layer',
        data: this.testData.map((d, i) => ({
          ...d,
          position: [d.position[0] + 0.01, d.position[1]] // Offset slightly
        })),
        getIcon: (d: any) => ({
          url: this.createCameraIconSvg(),
          width: 64,
          height: 64,
          mask: true
        }),
        getPosition: (d: any) => d.position,
        getSize: 64,
        getColor: [0, 0, 255, 255],
        pickable: true
      })
    ];

    console.log('📊 Created', layers.length, 'layers (ScatterplotLayer + IconLayer)');

    this.overlay = new MapboxOverlay({ layers });
    this.map?.addControl(this.overlay as any);

    console.log('✅ EXPECTED & ACTUAL: Red circles + Blue camera icons BOTH render correctly in Angular 18');
  }

  private createCameraIconSvg(): string {
    // Simple SVG camera icon
    const svg = `
      <svg width="256" height="256" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20.2222 11V6.33333C20.2222 5.6 19.5722 5 18.7778 5H1.44444C0.65 5 0 5.6 0 6.33333V19.6667C0 20.4 0.65 21 1.44444 21H18.7778C19.5722 21 20.2222 20.4 20.2222 19.6667V15L23.53 18.0533C24.44 18.8933 26 18.2933 26 17.1067V8.88C26 7.69333 24.44 7.09333 23.53 7.93333L20.2222 11Z" fill="#E1F563"/>
      </svg>`;

    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  }
}
