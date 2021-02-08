import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  apiKey: string = "7bc83c53b5c7ef04fa7ee3f398ba9194";

  constructor(private http: HttpClient) { }

  getRundomUser(): Observable<any> {
    let url = `https://randomuser.me/api/?inc=gender,name,picture,email,phone,dob`;
    return this.http.get(url);
  }

}
