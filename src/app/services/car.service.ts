import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CarImage } from '../models/carImage';
import { ListResponseModel } from '../models/ListResponseModel';
import { Car } from '../models/car';
import { ResponseModel } from '../models/responseModel';


@Injectable({
  providedIn: 'root'
})
export class CarService {
apiUrl="https://localhost:44383/api/cars/";

  constructor(private httpClient:HttpClient) { }

  getCars():Observable<ListResponseModel<Car>>{
    let newPath=this.apiUrl+"getcarsdetails";
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarsByBrand(brandName:string):Observable<ListResponseModel<Car>>{
    let newPath=this.apiUrl+"getcarsdetailsbybrand?brandName="+brandName
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarById(id:number):Observable<ListResponseModel<Car>>{
    let newPath=this.apiUrl+"getcardetailbyid?id="+id;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarImagesByCarId(id:number):Observable<ListResponseModel<CarImage>>{
    let newPath="https://localhost:44383/api/carimages/getbycarid?carId="+id;
    return this.httpClient.get<ListResponseModel<CarImage>>(newPath);
  }

  getCarsByColorName(colorName:string):Observable<ListResponseModel<Car>>{
    let newPath=this.apiUrl+"getcarsbycolorname?colorName="+colorName;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getFilteredCars(colorName:string,brandName:string){
    let newPath=this.apiUrl+"getfilteredcars?colorName="+colorName+"&brandName="+brandName
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  add(car:Car) :Observable<ResponseModel>{
    let newPath = this.apiUrl+"add";
    return this.httpClient.post<ResponseModel>(newPath,car);
  }

  update(car:Car):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"update",car);
  }
  
}
