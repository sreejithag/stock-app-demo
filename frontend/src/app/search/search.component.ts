import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  datalist = [];
  typed: string = '';
  notfound: boolean = false;
  results: any = null;
  constructor(private api: ApiService) {}

  ngOnInit(): void {}

  update() {
    this.api.getSuggestion(this.typed).subscribe(
      (data: any) => {
        this.datalist = data.data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  submit() {
    const item = this.typed;
    this.api.getData(item).subscribe(
      (data: any) => {
        if (data) {
          this.notfound = false;
          this.results = data.data;
        } else {
          this.notfound = true;
        }
      },
      (error) => {
        this.results = null;
        this.notfound = true;
        console.log(error);
      }
    );
  }
}
