import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { country } from '../shared/models/country';
import { customer } from '../shared/models/customer.model';
import { customerSearchDto } from '../shared/models/customerSearchDto';
import { HomeService } from '../shared/services/api/home.service';
import { NotifyService } from '../shared/services/utilities/notify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  //////////////////////////////////////////////////////////////////////////////
  //Defining attributes
  dataLoaded: boolean = false;
  tableHeaders: any[] = [];
  data: customer[] = [];
  refreshValue: string ="";
  apiPath:string="";
  tableactions: any[] = [];
  dataSearchObject:customerSearchDto={
    countryId: -1,
    valid: -1,
    pageSize: 10,
    pageIndex: 0
  };
  customerRow: customer;
  countriesLoaded:boolean=false;
  countriesList:country[];
   first:country=new country;
  showActions=true;

  @ViewChild('validSelected') validSelected: ElementRef;
  @ViewChild('countrySelected') countrySelected: ElementRef;
  storesData: any;
  selectedCountryValue:number;
  selectedValidValue:number;
  constructor(private homeService:HomeService,public notifyService:NotifyService) { }

  ngOnInit() {
    this.selectedValidValue=-1;
    this.first.id=-1;
    this.first.name='--Select--';
    this.homeService.getCountries().subscribe( (data: any) => {
      this.countriesList = data.data?data.data:data;
      this.countriesList.unshift(this.first);
      setTimeout(() => 
      {
        this.apiPath='customers';
        this.countriesLoaded=true;
        this.selectedCountryValue=-1;
       }, 0);
    });
    this.showActions =true;
    this.dataLoaded = true;
    
    //////////////////////////////////////////////////////////////////////////////
    //Table header
    this.tableHeaders = [
      { key: 'id', label: 'ID', type: 'name' },
      { key: 'name', label: 'Name', type: 'name' },
      { key: 'phone', label: 'Phone', type: 'name' },
      { key: 'country',secondLevel:'name', label: 'Country', type: 'nested-name' },
      { key: 'valid', label: 'Valid', type: 'boolean' },
    ];

  }

  //////////////////////////////////////////////////////////////////////////////
  OnCountriesChange(event)
  {
    this.dataSearchObject.countryId=this.countriesList[this.countrySelected.nativeElement.selectedIndex].id;
    this.refreshValue="refresh_"+(new Date());
  }

  OnValidChange(event)
  {
    this.dataSearchObject.valid=this.validSelected.nativeElement.selectedIndex-1;
     this.refreshValue="refresh_"+(new Date());
  }
  //////////////////////////////////////////////////////////////////////////////
  //Table refresh 
  getNotification(event:Event)
 {
   this.refreshValue="refresh_"+(new Date());
 }




}
