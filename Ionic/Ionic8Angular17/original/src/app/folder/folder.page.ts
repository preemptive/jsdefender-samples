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

  public folder: string | undefined;
  planets: any;
  loader: any;

  constructor(public callAPI: ItemsService, private activatedRoute: ActivatedRoute, public httpClient: HttpClient) {
    this.getPlanets();
  }

  ngOnInit() {
  }
  getPlanets() {
    this.loader = true;
    this.callAPI.callApiPlanets().subscribe(
      data => {
        this.planets = data.results;
        this.loader = false;
      },
      err => console.log(err)
    );
  }

}
