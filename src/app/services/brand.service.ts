import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand } from '../models/brand';
import { ListResponseModel } from '../models/ListResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
apiUrl="https://localhost:44383/api/brands/";
  constructor(private client:HttpClient) {}

  getBrands():Observable<ListResponseModel<Brand>>{
    return this.client.get<ListResponseModel<Brand>>(this.apiUrl+"getall");
  }

  add(brand:Brand):Observable<ResponseModel>{
    return this.client.post<ResponseModel>(this.apiUrl+"add",brand);
  }
}
