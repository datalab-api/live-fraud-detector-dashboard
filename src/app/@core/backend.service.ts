import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';


let headers = new HttpHeaders();
@Injectable({
  providedIn: 'root'
})
export class BackendService {


  constructor(private httpClient: HttpClient) {
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
  }

  onSubmitService(type: any): Observable<any> {
    // headers.append('Authorization', 'Basic ' + btoa(data.email + ':' + data.password));
    // this.curentUser = window.btoa(data.email + ':' + data.password);
    let errorMsg: string;
    return this.httpClient.post(`${environment.urlAPI}?type=${type}`, { headers: headers }).pipe(
      catchError((err) => {

        if (err.error instanceof ErrorEvent) {
            errorMsg = `Error : ${err.error.message}`;
        }
        return throwError(errorMsg);
    })
    );

  }

}
