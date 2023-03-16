import { Component, Input, OnInit, ViewChild } from '@angular/core';
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
import { ImusService } from '../../services/imus.service';
import { MapService } from '../../services/map.service';
import GeoJSON from 'ol/format/GeoJSON';
import { AutoRefreshComponent } from '../auto-refresh/auto-refresh.component';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {


  timerHidden: boolean = true;
  timerSeconds: number = 3;

  @Input('zoom') zoom: number = 10;
  @Input('center') center: any = [37.764079, 55.759886];

  @ViewChild(AutoRefreshComponent) autoRefreshComponent: AutoRefreshComponent;

  constructor(
    private imusService: ImusService,
    private mapService: MapService
  ) {}

  ngOnInit(): void {
    this.mapService.updateView(this.zoom, this.center);
    // this.mapService.setTileSource();
    this.mapService.updateSize();
  }

  addFeatures() {
    this.imusService.getGeo().subscribe((data: any) => {
      this.mapService.setFeatures(
        new GeoJSON().readFeatures(data, {
          dataProjection: 'EPSG:4326',
          featureProjection: 'EPSG:3857',
        })
      );

      // this.autoRefreshComponent.timerStop();

      this.timerHidden = false;
    });
  }

  ngAfterViewInit(): void {
    // if(this.autoRefreshComponent) {
    //   this.autoRefreshComponent.timerClear();
    // }
  }
}
