import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/ListResponseModel';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
apiUrl="https://localhost:44383/api/users/getall";
  constructor(private client:HttpClient) { }

  getUsers():Observable<ListResponseModel<User>>{
    return this.client.get<ListResponseModel<User>>(this.apiUrl);
  }
}
