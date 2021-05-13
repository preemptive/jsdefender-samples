import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ItemsService } from '../items.service';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {

  public folder: string;
  items: Observable<any>;
  planets: any;
  loader: any;
  name: any;
  constructor(public callAPI: ItemsService, private activatedRoute: ActivatedRoute, public httpClient: HttpClient) {
    this.getPlanets();
  }

  ngOnInit() {
  }
  getPlanets() {

    this.callAPI.callApiPlanets().subscribe(
      data => {
        console.log('data', data);
        this.planets = data.results;
      },
      err => console.log(err)
    );
  }

}
