import { Injectable } from '@angular/core';
import { HttpRequestsService } from '../services/utilities/http-request.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class TableDataService {

  constructor(private httpService: HttpRequestsService) { }


  getData(object:any,path:string): Observable<any>{
    let search:String;
    search='';
    for (const [key, value] of Object.entries(object)) {
      if(key!=null && value!=null)search+=((search)?'&':'?')+key+'='+value; 
    }
    return this.httpService.getHTTPRequest(path+search)
      .pipe(map((responseData: any) => responseData));
  }
  getDataPost(object: any, path: string): Observable<any> {
    return this.httpService.postHTTPRequest(path, object)
      .pipe(map((responseData: any) => responseData));
  }

  getDataStats(object: any, path: string){
    return this.httpService.postHTTPRequest(path + '/stats', object)
      .pipe(map((responseData: number) => responseData));
  }
}
