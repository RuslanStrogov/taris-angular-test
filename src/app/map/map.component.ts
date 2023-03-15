import { Component, OnInit } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import { OSM, XYZ } from 'ol/source';
import TileLayer from 'ol/layer/Tile';
import Feature from 'ol/Feature';
import { Circle, Point } from 'ol/geom';
import { fromLonLat } from 'ol/proj';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import { ImusService } from '../services/imus.service';
import { MapService } from '../services/map.service';
import GeoJSON from 'ol/format/GeoJSON';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  public map!: Map;
  // public base!: TileLayer;
  base: any;
  zoom: number = 10;

  center: any = [37.764079, 55.759886];

  constructor(
    private imusService: ImusService,
    private mapService: MapService
  ) {}

  ngOnInit(): void {
    this.mapService.updateView(this.zoom, this.center);
    this.mapService.setTileSource();
    this.mapService.updateSize();


    this.initTimer();


  }

  timerVal: any = 5;
  timerText: any = '';

initTimer() {
   let seconds = parseInt(this.timerVal);
   const timer = setInterval(() => {
     if(seconds < 1) {
       clearInterval(timer);
       this.addFeatures();

     }
     this.timerText = `Запрос к API через ${seconds} секунд`;
     seconds -= 1;
   }, 1000);
}


  addFeatures() {
    this.imusService.getGeo().subscribe((data: any) => {
      this.mapService.setFeatures(
        new GeoJSON().readFeatures(data, {
          dataProjection: 'EPSG:4326',
          featureProjection: 'EPSG:3857',
        })
      );
    });
  }

  ngAfterViewInit(): void {

    // setTimeout(() => {
    //   this.addFeatures();
    // }, 3000)


  }
}
