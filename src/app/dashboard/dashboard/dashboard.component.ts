import { Component, OnDestroy, OnInit } from '@angular/core';
import {NgbDateParserFormatter, NgbDateStruct, NgbModal, NgbTabset} from '@ng-bootstrap/ng-bootstrap';
import { DashboardService } from '../../dashboard.service';
import { HttpClient } from '@angular/common/http';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs/Subject';
import {ViewChild} from '@angular/core';
import * as Chartist from 'chartist';
import { ChartType, ChartEvent } from 'ng-chartist/dist/chartist.component';
import { from } from 'rxjs/observable/from';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as moment from 'moment';
import { AfterViewInit, QueryList, ViewChildren } from '@angular/core';
import { MatTableDataSource,MatPaginator,MatSort } from '@angular/material';
import {MatIconModule} from '@angular/material/icon';


declare var require: any;

const data: any = require('../../shared/data/chartist.json');
@Component({
    selector: 'app-dashboard1',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit, AfterViewInit{
    MyDataSource: any;
    displayedColumns = ['sessionType', 'fileType','direction','ctscount','cchcount',];
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
   
    public outwardfileshow:boolean=false;
    public inwardfileshow:boolean=false;
    public outwardreturnshow:boolean=false;
    public inwardreturnshow:boolean=false;
    public dashboardTable:boolean = false;
    public demId:any;
    public outwardResponse:any; 
    public inwardResponse:any;
    public dateSelect:any;
    
    public  obj = {
        dataExchangeModuleId: null,
        localDate: null,
        fileType: "CXF"
   };

    constructor(private http: HttpClient,
                private ngbDateParserFormatter: NgbDateParserFormatter,
                private dashboardService: DashboardService){
                                           
    }
   
    ngOnInit() {
   
      this.outwardfile(); 
  }

  ngAfterViewInit(): void {
    
  }
   
   ngOnDestroy(): void {
  
  }
  demIdChange(){
    this.obj.dataExchangeModuleId = this.demId;
    console.log("demid displayed",this.obj);

}

onDateSelect(event){
    this.dateSelect= event
    // this.dashboardTable=true;
    this.obj.localDate = this.dateSelect.year+"-"+this.dateSelect.month+"-"+this.dateSelect.day;
    this.obj.localDate = moment(this.obj.localDate).format("YYYY-MM-DD");
    console.log("messageee",this.obj.localDate);
    this.outwardfile();
    
}

outwardfile(){
    console.log("entering into outward");
    this.obj.fileType = "CXF";
    this.dashboardService.getOutwardPresentment(this.obj)
    .subscribe(
        res => {
          this.MyDataSource = new MatTableDataSource();
          this.MyDataSource.data = res;
          this.MyDataSource.sort = this.sort;
          this.MyDataSource.paginator = this.paginator;
          console.log(this.MyDataSource.data);
        },
        error => {
          console.log('There was an error while retrieving Todos !!!' + error);
        });

}

   inwardfile(){
       
            console.log("entering into inward");
            this.obj.fileType = "PXF";
            this.dashboardService.getOutwardPresentment(this.obj)
            .subscribe(
              res => {
                this.MyDataSource = new MatTableDataSource();
                this.MyDataSource.data = res;
                this.MyDataSource.sort = this.sort;
                this.MyDataSource.paginator = this.paginator;
                console.log(this.MyDataSource.data);
              },
              error => {
                console.log('There was an error while retrieving Todos !!!' + error);
              });
      
      }

      outwardreturns(){
       
        console.log("entering into outward returns");
        this.obj.fileType = "RRF";
        this.dashboardService.getOutwardPresentment(this.obj)
        .subscribe(
          res => {
            this.MyDataSource = new MatTableDataSource();
            this.MyDataSource.data = res;
            this.MyDataSource.sort = this.sort;
            this.MyDataSource.paginator = this.paginator;
            console.log(this.MyDataSource.data);
          },
          error => {
            console.log('There was an error while retrieving Todos !!!' + error);
          });
  
  }

  inwardreturns(){
       
    console.log("entering into inward");
    this.obj.fileType = "RF";
    this.dashboardService.getOutwardPresentment(this.obj)
    .subscribe(
      res => {
        this.MyDataSource = new MatTableDataSource();
        this.MyDataSource.data = res;
        this.MyDataSource.sort = this.sort;
        this.MyDataSource.paginator = this.paginator;
        console.log(this.MyDataSource.data);
      },
      error => {
        console.log('There was an error while retrieving Todos !!!' + error);
      });

}

    Filter(searchstring:string)
    {
      searchstring = searchstring.trim(); 
      searchstring = searchstring.toLowerCase();
      this.MyDataSource.filter = searchstring;
    }

   
}