import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor(public httpClient: HttpClient) { }
  public static apiURL = 'https://swapi.dev/api/';

  callApiPlanets() {
    const url = ItemsService.apiURL + 'planets/?page=1';
    return this.httpClient.get(url).pipe(map((res: any) => {
      return res;
    }));
  }

  callApiFilms() {
    const url = ItemsService.apiURL + 'films/?page=1';
    return this.httpClient.get(url).pipe(map((res: any) => {
      return res;
    }));
  }

  callApiPeople() {
    const url = ItemsService.apiURL + 'people/?page=1';
    return this.httpClient.get(url).pipe(map((res: any) => {
      return res;
    }));
  }

}
