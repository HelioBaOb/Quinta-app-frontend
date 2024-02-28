import { Component, OnInit, Input, Pipe, PipeTransform, ViewChild} from '@angular/core';

declare var mapboxgl: any;

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss'],
})
export class MapaComponent  implements OnInit {

  @Input() coords?: string = "";
  @ViewChild('mapa', {static:true}) mapa: any;

  constructor() { }

  ngOnInit() {
    const latLng = (this.coords ?? "").split(',');
    const lat = Number(latLng[0]);
    const lng = Number(latLng[1]);

    mapboxgl.accessToken = 'pk.eyJ1IjoiaGJhcnJpZ2EiLCJhIjoiY2x0MzVjbmRlMWZ6bzJqcXlxYWF0d3g4ZiJ9.VkZDLTUJCvh7q1Cnt2cc3A';
    
    const map = new mapboxgl.Map({
      container: this.mapa.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [lng, lat], // starting position [lng, lat]
      zoom: 15, // starting zoom
    });

    const marker = new mapboxgl.Marker()
      .setLngLat([lng, lat])
      .addTo(map);

  }

}
