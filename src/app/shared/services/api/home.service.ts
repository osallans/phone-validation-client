import { Injectable } from "@angular/core";
import { HttpRequestsService } from 'src/app/shared/services/utilities/http-request.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { country } from "../../models/country";

@Injectable()

export class HomeService {

  constructor(private httpService: HttpRequestsService) {}

  getCountries(): Observable<country[]> {
    return this.httpService.getHTTPRequest('countries')
      .pipe(map((responseData: country[]) => responseData));
  }
}