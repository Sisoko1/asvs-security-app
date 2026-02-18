import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AsvsService {

  constructor(private http: HttpClient) {}

getASVSData() {
  return this.http.get('/assets/data/asvs.json');
}

}
