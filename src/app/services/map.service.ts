import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
// import ZoomToExtent from 'ol/control/ZoomToExtent';
import FullScreen from 'ol/control/FullScreen';
import Attribution from 'ol/control/Attribution';
import OsmSource from 'ol/source/OSM';
import StamenSource from 'ol/source/Stamen';
import VectorSource from 'ol/source/Vector';
// import GeoJSON from 'ol/format/GeoJSON';
import { fromLonLat, transform } from 'ol/proj';
import { defaults as defaultControls } from 'ol/control';
import { defaults as defaultInteractions, Modify, PinchZoom } from 'ol/interaction';
import { Injectable } from '@angular/core';
import { Collection, Feature } from 'ol';
import { Geometry, Point } from 'ol/geom';
// import { Vector } from '../models/vector';
import { Icon, Style } from 'ol/style';
import { Color } from 'ol/color';

@Injectable()
export class MapService {
  tileSources = [
    { name: 'None', source: null },
    { name: 'OSM', source: new OsmSource() },
    { name: 'Stamen', source: new StamenSource({ layer: 'toner' }) },
  ];

  selectedTileSource = this.tileSources[1];
  public vectorSources: any[] = [];

  private readonly map: Map;
  private readonly tileLayer: TileLayer<OsmSource>;
  private readonly vectorLayer: VectorLayer<any>;
  // private readonly extent = [
  //   813079.7791264898, 5929220.284081122, 848966.9639063801, 5936863.986909639,
  // ];

  constructor() {
    this.tileLayer = new TileLayer();
    this.vectorLayer = new VectorLayer<any>();


    const initFeature = new Feature({
      geometry: new Point(fromLonLat([37.764079, 55.759886]))
    });

    initFeature.setStyle(new Style({
      image: new Icon(({
        color: '#8959A8',
        crossOrigin: 'anonymous',
        src: 'assets/img/dot.png',
        imgSize: [20, 20]
      }))
    }));

    const ccVectorSource = new VectorSource({
      features: [initFeature]
    });

    const vectorLayer = new VectorLayer({
      source: ccVectorSource
    });

    this.map = new Map({
      interactions: defaultInteractions().extend([new PinchZoom()]),
      layers: [
        this.tileLayer,
        this.vectorLayer,
        vectorLayer,
      ],
      view: new View({
        constrainResolution: true,
      }),
      controls: defaultControls().extend([
        new Attribution(),
        // new ZoomToExtent({ extent: this.extent }),
        new FullScreen(),
      ]),
    });

  }

  randomInteger(max: any) {
    return Math.floor(Math.random()*(max + 1));
}

  randomRgbColor() {
    let r = this.randomInteger(255);
    let g = this.randomInteger(255);
    let b = this.randomInteger(255);
    return [r,g,b];
}

  randomHexColor(): Color | string {
    let [r,g,b] = this.randomRgbColor();
    let hr = r.toString(16).padStart(2, '0');
    let hg = g.toString(16).padStart(2, '0');
    let hb = b.toString(16).padStart(2, '0');
    return "#" + hr + hg + hb;
}

  //TODO: DEMO
  setFeatures(data: any[]) {
    const features = (data ?? []) as
    | Feature<Geometry>[]
    | Collection<Feature<Geometry>>
    | undefined;

    features?.forEach((item: any) => {
      item.setStyle(new Style({
        image: new Icon(({
          // color: '#8959A8',
          color: this.randomHexColor(),
          crossOrigin: 'anonymous',
          src: 'assets/img/dot.png',
          imgSize: [20, 20]
        }))
      }))
    })

  const vectorSource = new VectorSource({ features });
  const vector: any = {
    name: 'qwe',
    source: vectorSource
  };
  this.vectorSources.push(vector);
  this.setVectorSource(vector);
  }

  updateView(zoom = 2, center: [number, number] = [0, 0]): void {
    this.map.getView().setZoom(zoom);
    this.map.getView().setCenter(fromLonLat(center));
  }

  updateSize(target = 'map'): void {
    this.map.setTarget(target);
    this.map.updateSize();
  }

  setTileSource(source = this.selectedTileSource): void {
    this.selectedTileSource = source;
    this.tileLayer.setSource(source.source);
  }

  setVectorSource(source: any): void {
    this.vectorLayer.setSource(source.source);
    // console.log('setVectorSource', this.vectorLayer.getSource())
    this.map.getView().fit(
      this.vectorLayer.getSource().getExtent(),
      { duration: 1000 }
      );
  }

}
