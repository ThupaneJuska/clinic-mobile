import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

interface Medication {
  name: string;
  description: string;
  availability: string;
  fileId: string;
  medFor: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  serverUrl: string = environment.serverUrl

  constructor(private http: HttpClient) { }

  get(endpoint:string){
    return this.http.get<Medication[]>(`${this.serverUrl}${endpoint}`)
  }
}
