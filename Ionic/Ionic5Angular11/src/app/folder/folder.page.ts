import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;
  films: Observable<any>;
  planets: any;
  loader: any;
  constructor(private activatedRoute: ActivatedRoute, public httpClient: HttpClient) {
    this.loader = true;
    this.films = this.httpClient.get('https://swapi.dev/api/planets/?page=1');
    this.films
    .subscribe(data => {
     // console.log("2--", data.results);
      this.planets = data.results;
      this.loader = false;
    });
   }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
  }

}
