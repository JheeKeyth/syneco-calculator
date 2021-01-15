import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Historic } from '../model/historic';

const API = 'http://localhost:8090/api/v1';

@Injectable({providedIn: 'root'})
export class HistoricService {

    constructor(private http: HttpClient) {
      this.http = http;
    }

    getHistoric() {
        return this.http.get<Historic[]>(API +'/historic');
    }

    postHistoric(historic: any) {
      return this.http.post(API +'/historic', historic);
    }
  
    deleteAllHistoric(){
      return this.http.delete<Historic[]>(API +'/historic');
    }

}