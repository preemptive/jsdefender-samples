import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ItemsService } from '../items.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.page.html',
  styleUrls: ['./characters.page.scss'],
  standalone: false
})
export class CharactersPage implements OnInit {

  public folder: string | undefined;
  peoples: any;
  loader: any;

  constructor(public callAPI: ItemsService, private activatedRoute: ActivatedRoute, public httpClient: HttpClient) {
    this.getPeople();
  }

  ngOnInit() {
  }
  getPeople() {
    this.loader = true;
    this.callAPI.callApiPeople().subscribe(
      data => {
        this.peoples = data.results;
        this.loader = false;
      },
      err => console.log(err)
    );
  }

}

