import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/ListResponseModel';
import { Rental } from '../models/rental';

@Injectable({
  providedIn: 'root'
})
export class RentalService {
apiUrl="https://localhost:44383/api/rentals/getrentalsdetails";
  constructor(private client:HttpClient) { }

  getRentals():Observable<ListResponseModel<Rental>>{
    return this.client.get<ListResponseModel<Rental>>(this.apiUrl);
  }
}
