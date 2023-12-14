import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as base64 from 'base-64';
import * as utf8 from 'utf8';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://pm.agilecyber.co.uk'; // Replace with your API URL
  constructor(private http: HttpClient,private cookieService: CookieService) {}
  keygeneration(username: any, password: any) {
    var userdata = base64.encode(utf8.encode(username + ':' + password));
    return userdata
  }

 
  login(credentials: {authenticity_token: any}): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Basic ${credentials.authenticity_token}`,
    });
    let endpoint="/users/current.json"
    let url=new URL(this.apiUrl+endpoint)

    return this.http.get(url.toString(), { headers });
  }

  getToken(): string | null {
    return this.cookieService.get('yourTokenKey') || null;
  }
  getLoginData(): any {
    const loginDataString = localStorage.getItem('loginData');
    return loginDataString ? JSON.parse(loginDataString) : null;
  }



  // getProjectTimeEntries(userId: string, month: string): Observable<any> {
  //   const url = `${this.apiUrl}/projects/lunch/time_entries.json`;
  //   const getToken =this.getToken()
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     "Authorization": `Basic ${getToken}`,
  //   });

  //   const params = {
  //     sort: 'spent_on:desc',
  //     'f[]': ['spent_on', 'user_id'],
  //     'op[spent_on]': month,
  //     'f[user_id]': '==',
  //     'v[user_id][]': userId,
  //   };

  //   return this.http.get(url, { headers, params }).pipe(
  //     catchError((error: any) => {
  //       console.error('API Error:', error);
  //       throw error;
  //     })
  //   );
  // }
  getcurrentmonthdata(userId: string, month: string): Observable<any> {

    const getToken =this.getToken()
    const url = `${this.apiUrl}/acsapi/public/redmine/lunch/${userId}/${month}`;
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        "Authorization": `Basic ${getToken}`,
      });
      return this.http.get(url, { headers }).pipe(
            catchError((error: any) => {
              console.error('API Error:', error);
              throw error;
            })
          );

  }


  private messageSource = new BehaviorSubject<string>(''); // Initial value is an empty string
  currentMessage = this.messageSource.asObservable();
  changeMessage(message: string) {
    console.log("message",message)
    this.messageSource.next(message);
  }

}
