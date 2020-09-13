import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  constructor(private http: HttpClient) { }

  getData() {
    return this.http.get('assets/data.json')
      // .pipe(map(x => x));
  }
}
