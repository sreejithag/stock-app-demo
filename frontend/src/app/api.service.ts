import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  public login(data: any) {
    const endpoint = 'http://localhost:3000/api/v1/login';
    const headers = { 'Content-Type': 'application/json' };
    const body = JSON.stringify(data);
    console.log(body);
    return this.http.post(endpoint, body, { headers });
  }

  public getSuggestion(key: string) {
    const endpoint = 'http://localhost:3000/api/v1/suggest/' + key;
    let headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + sessionStorage.getItem('token')
    );
    return this.http.get(endpoint, { headers: headers });
  }

  public getData(company: string) {
    const endpoint = 'http://localhost:3000/api/v1/data/' + company;
    let headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + sessionStorage.getItem('token')
    );
    return this.http.get(endpoint, { headers: headers });
  }
}
