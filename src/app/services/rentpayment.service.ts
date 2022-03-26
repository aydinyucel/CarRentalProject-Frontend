import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RentpaymentService {
url = "http://localhost:4200/rentals/payment"
  constructor(private client:HttpClient) { }

}
