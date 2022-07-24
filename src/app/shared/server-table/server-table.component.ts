import { Component, OnInit, Input, EventEmitter, Output, SimpleChanges, SimpleChange, OnChanges, ViewChild, ElementRef} from '@angular/core';
import { TableDataService } from './table-data.service';
import { NotifyService } from '../services/utilities/notify.service';
import { saveAs } from 'file-saver';


@Component({
  selector: 'app-server-table',
  templateUrl: './server-table.component.html',
  styleUrls: ['./server-table.component.css']
})
export class ServerTableComponent implements OnInit,OnChanges {

  @Input() headers: any[] = [];
  @Input() rowactions: any[] = [];
  @Input() showcontrols: boolean;
  @Input() selectRows: boolean;
  @Input() displayCount: boolean;
  @Input() selectRowsConditional: any;
  @Input() columnsearch: boolean;
  @Input() apiPath: string;
  @Input() refreshValue: string;
  @Input() getSelected:string;
  @Input() tablesearch:boolean;
  @Input() enablePaging:boolean;
  @Input() searchField: any = {};
  @Output() methodCall: EventEmitter<{}> = new EventEmitter<{methodName: string, methodParam: any}>();
  paginationConfig: { itemsPerPage: number, currentPage: number};
  searchObject: any = {};
  limitOptions: number[] = [5, 10, 15, 20, 50, 100];
  isDesc: boolean;
  column: string;
  exportSearchObject={};
  currentData: any[] = [];
  pageNumbers: number[] = [];
  paginationLimits: string = "";
  count: number = 0;
  countLoaded: Boolean = false;
  searchObjectInitialized: Boolean = false;
  allSelected=false;
  

  constructor(private tableDataService: TableDataService,private notifyService : NotifyService) {}

  ngOnInit() {
    
    this.headers.forEach(header => {
      if(header.type == "name" || header.type == "date"){
        this.searchObject[header.key] = null;
      }
      if(header.type == "boolean"){
        this.searchObject[header.key] = null;
      }
      if(header.type == "nested-name" || header.type == "nested-date"){
        this.searchObject[header.key] = null;
      }
    });
    //if(this.searchField.key)
    //this.searchObject[this.searchField.key]=this.searchField.value;
    this.searchObject=this.searchField;
    this.searchObjectInitialized = true;
    if(this.enablePaging)
    {
      this.searchObject.pageIndex = 0;
      this.searchObject.pageSize = 10;
      this.searchObject.orderfield = 'id';
      this.searchObject.orderdir = 'asc';
    }

    this.paginationConfig = 
    {
      itemsPerPage: (this.enablePaging)?10:100000,
      currentPage: 1
    };
    console.log('before',this.searchObject);
    this.getCount();
  }

  clearFilters()
  {
    for (var key in this.searchObject) {
   
      if (this.searchObject.hasOwnProperty(key) && key!=="sortAttribute" && key!=="sortDirection" && key!=="limit" && key!=="offset") {
        this.searchObject[key]=null;
      }
    }
  }

  rowsPerPageChanged() {
    this.setPageNumbers();
    this.paginationConfig.currentPage = 1;
    this.searchObject.pageSize = Number(this.paginationConfig.itemsPerPage);
    //this.searchObject.offset = Number((this.paginationConfig.currentPage - 1) * this.paginationConfig.itemsPerPage);
    this.searchObject.pageIndex=0;
    this.getPage(this.searchObject);
  }

  pageChanged() {
    //this.searchObject.offset = (this.paginationConfig.currentPage - 1) * this.paginationConfig.itemsPerPage;
    this.searchObject.pageIndex=this.paginationConfig.currentPage-1;
    this.getPage(this.searchObject);
  }

  firstPage() {
    this.paginationConfig.currentPage = 1;
    //this.searchObject.offset = (this.paginationConfig.currentPage - 1) * this.paginationConfig.itemsPerPage;
    this.searchObject.pageIndex=0;
    this.getPage(this.searchObject);
  }

  previousPage() {
    this.paginationConfig.currentPage--;
    //this.searchObject.offset = (this.paginationConfig.currentPage - 1) * this.paginationConfig.itemsPerPage;
    this.searchObject.pageIndex=this.paginationConfig.currentPage-1;
    this.getPage(this.searchObject);
  }

  nextPage() {
    this.paginationConfig.currentPage++;
    //this.searchObject.offset = (this.paginationConfig.currentPage - 1) * this.paginationConfig.itemsPerPage;
    this.searchObject.pageIndex=this.paginationConfig.currentPage-1;
    this.getPage(this.searchObject);
  }

  lastPage() {
    this.paginationConfig.currentPage = this.pageNumbers[this.pageNumbers.length-1];
    //this.searchObject.offset = (this.paginationConfig.currentPage - 1) * this.paginationConfig.itemsPerPage;
    this.searchObject.pageIndex=this.paginationConfig.currentPage-1;
    this.getPage(this.searchObject);
  }
  
  toggleSelectionItem(row)
  {
    if(row)
    {
      if(row.selected) {delete row.selected;this.allSelected=false;}
      else row.selected=true;
    }
   
  }
  toggleSelectionAll(data)
  {
      this.allSelected=data;
      this.currentData.forEach(row=>
        {
          if(!(this.selectRowsConditional&&this.selectRowsConditional.value.indexOf(row[this.selectRowsConditional.name])>-1))
          {
            if(data)row.selected=true;
            else delete row.selected;
          }
        }
      )
  
  }
  clearSelection()
  {
    if(this.selectRows){
      this.allSelected=false;
      this.currentData.forEach(
      row=>
      {
          delete row.selected;
      }
     )
    }
  }

  search(reset:boolean){
    
    this.paginationConfig.currentPage = (reset)?1:this.paginationConfig.currentPage;
    if(reset)this.searchObject.pageIndex=0;
    this.searchObject.offset = (this.paginationConfig.currentPage - 1) * this.paginationConfig.itemsPerPage;
    //Sending null in case of empty string
    // for (var key in this.searchObject) {
    //   if (this.searchObject.hasOwnProperty(key) && key!=="orderfield" && key!=="page" && key!=="pagesize" && key!=="orderdir") {
    //     this.searchObject[key]=this.searchObject[key]==''?null:this.searchObject[key];
    //   }
    // }
    if(this.searchField.key)
      this.searchObject[this.searchField.key]=this.searchField.value;
    //Sending 1 or 0 in case of boolean search
    // this.headers.forEach(header => {
    //   if(header.type == "boolean"){
    //     this.searchObject[header.key].toL = null;
    //   }
    // }

    this.getCount();
  }
  getPage(searchObj: any) {
    this.clearSelection();
    console.log(searchObj);
    let loadID=this.notifyService.onLoad("Loading data , please wait","Loading").id;
    this.tableDataService.getDataPost(searchObj, this.apiPath).subscribe((data: any) => { 
    console.log(data);
      this.count = (this.enablePaging) && data.stats?data.stats.count:data.count?data.count:data.length;
      this.getPaginationLimits();
      //this.getPage(this.searchObject);
            this.setPageNumbers();
            this.countLoaded = data.stats && this.enablePaging;
       /////////////////////
       if(!((data.results?data.results:data.data?data.data:data) instanceof Array)){
        this.currentData=[];
        this.currentData.push(data.results?data.results:data.data?data.data:data);
        }
        else
        this.currentData = data.results?data.results:data.data?data.data:data;
        
       //////////////////////     
      this.notifyService.onLoadCompelete(loadID);
    },error=>{
      console.error(error);
      this.notifyService.onLoadCompelete(loadID);
      this.notifyService.onError("Error occurred .. Please check your network connection and try again", "Error");
    });
    
  }


  getCount(){
    console.log(this.searchObject);
    this.getPage(this.searchObject);
      
  //  this.tableDataService.getDataStats(this.searchObject, this.apiPath).subscribe((data: any) => {
      //this.count = data[0].records;
    //  this.getPage(this.searchObject);
      //this.setPageNumbers();
      //this.countLoaded = true;
      
    //},error=>{ 
      //console.log(error);
  //  });
    
  }

  //function that sets the pageNumbers array
  setPageNumbers(){
    this.pageNumbers = [];
    let totalItems = this.count;
    let pageNum = 1;
    for(let i=0; i<totalItems; i+=(Number)(this.paginationConfig.itemsPerPage)){
      this.pageNumbers.push(pageNum);
      pageNum++;
    }
  }

  
  ngOnChanges(changes: SimpleChanges) {
    const currentItem: SimpleChange = changes.item;
    
    if(this.refreshValue && this.refreshValue.indexOf('refresh')>-1){
      this.search((this.refreshValue.indexOf('refresh')>-1));
      this.refreshValue="";
      if(this.getSelected)this.getSelected="";
    }
    if(this.getSelected && this.getSelected.indexOf('Selected')>-1)
    {
      this.callParentMethod(this.getSelected.split("_")[0],this.currentData);
      this.getSelected="";
    }
  }

  // returns the pagination limits and currently shown number of items i.e. "11 - 20 of 333"
  getPaginationLimits() {
    let lowerLimit: number = ((this.paginationConfig.currentPage - 1) * this.paginationConfig.itemsPerPage) + 1;
    let upperLimit: number = lowerLimit + (Number)(this.paginationConfig.itemsPerPage) - 1;
    let maxLimit: number = this.count;

    this.paginationLimits = lowerLimit + ' - ' + (upperLimit > maxLimit? maxLimit : upperLimit) + ' of ' + maxLimit;
  }



  sort(property: any) {
    let sortKey='';
    if(property.type.indexOf('double')>-1){
      sortKey=property.key+"."+property.secondLevel+"."+property.secondLevel.thirdLevel;
    }
    else if (property.type.indexOf('nested')>-1){
      sortKey=property.key+"."+property.secondLevel;
    }
    else
    {
      sortKey=property.key;
    }
    this.isDesc = !this.isDesc; //change the direction   
    this.column = sortKey;     //to show the sorting arrow
    this.searchObject.sortAttribute = sortKey;
    let direction = this.isDesc ? 1 : -1;
    this.searchObject.sortDirection = this.isDesc ? "desc" : "asc";
    
    this.getPage(this.searchObject);    
  };

  calculateControlsColumnWidth(rowActionsLength: number): string {
    let baseWidth: number = 90;
    if (rowActionsLength === 1)
      return '' + baseWidth + 'px';
    else
      return '' + (baseWidth + ((rowActionsLength - 1) * 35)) + 'px';
  }

  callParentMethod(actionHandler: string, row: any) {
    this.methodCall.emit({
      methodName: actionHandler,
      methodParam: row
    });
   
  }

  isLastPage(){
    if(this.paginationConfig.currentPage == this.pageNumbers[this.pageNumbers.length-1] || this.pageNumbers.length == 0){
      return true;
    }else{
      return false;
    }
  }

  isFirstPage(){
    if(this.paginationConfig.currentPage == this.pageNumbers[0] || this.pageNumbers.length == 0){
      return true;
    }else{
      return false;
    }
  }
  
}
