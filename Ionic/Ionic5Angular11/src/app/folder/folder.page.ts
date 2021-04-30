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
  items: Observable<any>;
  planets: any;
  loader: any;

  /**
   * this method is used for get planets information
   */
  constructor(private activatedRoute: ActivatedRoute, public httpClient: HttpClient) {
    this.loader = true;
    this.items = this.httpClient.get('https://swapi.dev/api/planets/?page=1');
    this.items
      .subscribe(data => {
        this.planets = data.results;
        this.loader = false;
      });
  }

  ngOnInit() { }

}
