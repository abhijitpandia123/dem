import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';

@Injectable()
export class DashboardService {
public mainUrl: string = "http://192.168.0.217:2080/vsoft-cts-dem-daemon-api-impl-0.0.1/dashboard"
   constructor(private http: HttpClient){}
  
  getOutwardPresentment(){
      console.log("outwarddata............",);
      
        return  this.http.get("https://restcountries.eu/rest/v2/all",{ 
        // params: {
        //       dataExchangeModuleId: obj.dataExchangeModuleId,
        //       localDate: obj.localDate,
        //       fileType: obj.fileType

        //   }

      })
  };

}   