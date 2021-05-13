import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ItemsService } from '../items.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.page.html',
  styleUrls: ['./characters.page.scss'],
})
export class CharactersPage implements OnInit {

  public folder: string;
  peoples: any;
  loader: any;

  constructor(public callAPI: ItemsService, private activatedRoute: ActivatedRoute, public httpClient: HttpClient) {
    this.getPlanets();
  }

  ngOnInit() {
  }
  getPlanets() {

    this.callAPI.callApiPeople().subscribe(
      data => {
        this.peoples = data.results;
      },
      err => console.log(err)
    );
  }

}

