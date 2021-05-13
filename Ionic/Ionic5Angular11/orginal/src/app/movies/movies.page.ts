import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ItemsService } from '../items.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
})
export class MoviesPage implements OnInit {

  public folder: string;
  movies: any;
  loader: any;

  constructor(public callAPI: ItemsService, private activatedRoute: ActivatedRoute, public httpClient: HttpClient) {
    this.getPlanets();
  }

  ngOnInit() {
  }
  getPlanets() {

    this.callAPI.callApiFilms().subscribe(
      data => {
        this.movies = data.results;
      },
      err => console.log(err)
    );
  }

}
