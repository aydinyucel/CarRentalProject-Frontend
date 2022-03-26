import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarImage } from '../models/carImage';
import { ListResponseModel } from '../models/ListResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarImageService {
apiUrl="https://localhost:44383/";
  constructor(private client:HttpClient) { }

  getAllCarImages(carId:number):Observable<ListResponseModel<CarImage>>{
    let newPath="api/carimages/getall";
    return this.client.get<ListResponseModel<CarImage>>(newPath);
  }
}
