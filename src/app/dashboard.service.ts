import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';

@Injectable()
export class DashboardService {
public mainUrl: string = "http://192.168.0.85:8184/vsoft-cts-dem-daemon-api-impl-1.0.0/dashboard"
   constructor(private http: HttpClient){}
  
  getOutwardPresentment(obj){
      console.log("outwarddata",obj);
      
        return  this.http.get(this.mainUrl,{ 
        params: {
              dataExchangeModuleId: obj.dataExchangeModuleId,
              localDate: obj.localDate,
              fileType: obj.fileType

          }

      })
  };
  

}   