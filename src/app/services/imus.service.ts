import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ImusService {
  private url: string = '../assets/geo.json';
  // private url: string = 'http://backend.imus.city/api/geojson/geo';

  constructor(private http: HttpClient) {}

  getGeo(): Observable<any[]> {
    return this.http
      .get(this.url, {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      })
      .pipe(map((res: any) => res));
  }
}
