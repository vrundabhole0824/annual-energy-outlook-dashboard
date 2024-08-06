import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class GetdataService {

  constructor(private http:HttpClient) { 
  }
  
  getdata()
{
  return this.http.get('http://localhost:5000/data');
} 


}
