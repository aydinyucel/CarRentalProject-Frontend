import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Color } from '../models/color';
import { ListResponseModel } from '../models/ListResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
apiUrl="https://localhost:44383/api/colors/"
  constructor(private client:HttpClient) { }

  getColors():Observable<ListResponseModel<Color>>{
    return this.client.get<ListResponseModel<Color>>(this.apiUrl+"getall");
  }

  add(color:Color) :Observable<ResponseModel>{
    return this.client.post<ResponseModel>(this.apiUrl+"add",color);
  }

  update(color:Color):Observable<ResponseModel>{
    return this.client.post<ResponseModel>(this.apiUrl+"update",color);
  }

}
