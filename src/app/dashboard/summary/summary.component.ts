import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Rx';
import { Http, Response } from '@angular/http';
import { NgxSpinnerService } from 'ngx-spinner';
import{ResearchdataService} from '../services/research.service';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import {
 FormGroup,
 FormBuilder,
 Validators,
 FormControl
} from '@angular/forms';


declare let require: any;
declare var $: any;
@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
   dtTrigger: Subject<any> = new Subject();
   // data =[{"id":'1',"name":'ronak'},{"id":'2',"name":"hello"}]
   soucedata=[];
   archivedata=[];
   reviewedata=[];
   unarchived=[];
   drafted=[];
   sourcedvalue=0;
   // reviewvalue=0;
   // archivevalue=0;
   unarchivevalue=0;
   draftvalue=0;


  //details added by Rohan will be filtered afterwards
    data = [];
 productlist:any[];
 //reviewdata=[];
private reviewData: Object = {};
private draftartData: Object = {};
private commentarticle: object={};
reviewdata :any ={};
draftDataResponse: any;
singleRecordData: any = [];
drugsAurobindo: boolean;
counterAuthorization: any;
publicationDate: any;
withdrawDate: any;
approvalDate: any;
drugWithdrawCode: any;
drugApprovalDate: any;
brandDrag: boolean;
startDate: any;
formulationDrug: any;
commentDiv: boolean;
authorComment: any;
administrationRoute: any;
readonly:String;
articleform: any;


 //
authordata;
abstractdata;
modaltitle;
articletitlecmt;
archivevalue=0;
reviewvalue=0;

articlesourcevalue;
draftForm:any;
reviewForm:any;
commentForm:any;
product_namemodel;
selectedcomments=[];
artcomments=[];
comments:any=[];
commentselected=[];
 //


  constructor(private spinner:NgxSpinnerService, private researchdataService : ResearchdataService,
    private toastr:ToastrService) { 
  }

  ngOnInit():void {

      this.formCreate();
      this.closemodal();
      this.spinner.show();

 this.dtOptions = {
      pagingType: 'full_numbers',
      };
 this.getdashboard();
   /* this.researchdataService.getsearchArt()
     .subscribe((res) => {
            console.log("-----summary res----",res)
             this.soucedata = res.searchresult;
             this.sourcedvalue=this.soucedata.length;
             this.artcomments=res.comments;
             this.comments=res.checklistComments;
             console.log("datas",this.data)
             for(var i=0;i<this.soucedata.length;i++){
               if(this.soucedata[i].archived=="yes"){
                 this.archivedata.push(this.soucedata[i])
                 console.log("----archive",this.soucedata[i])
                 this.archivevalue++;
               }
               if(this.soucedata[i].status=="submit for review" && this.soucedata[i].archived!="yes"){
                 this.reviewedata.push(this.soucedata[i])
                 this.reviewvalue++;
               }
               if(this.soucedata[i].archived=="no"){
                 this.unarchived.push(this.soucedata[i])
                 this.unarchivevalue++;
               }
               if(this.soucedata[i].status=="saved as drafted" && this.soucedata[i].archived!="yes"){
                 this.drafted.push(this.soucedata[i])
                 this.draftvalue++
               }

             }
             console.log("--archivedata---",this.archivedata)
               this.dtTrigger.next();
               this.spinner.hide();
           });*/


    /*form creation for popup modal - author rohan*/
  }

formCreate() {

         this.articleform = new FormGroup({
                      belongstatus: new FormControl(false),
                      contryauth: new FormControl(''),
                      Publication_Date: new FormControl(''),
                      Product_Approval_Date: new FormControl(''),
                      Product_Withdrawn_Date: new FormControl(''),
                      drug_Start_Date: new FormControl(''),
                      drugApproval_Date: new FormControl(''),
                      drugWithdrawn_Date: new FormControl(''),
                      administration_of_Drug: new FormControl(''),
                      Formulation_of_Drug: new FormControl(''),
                      Brand_drug_mentioned: new FormControl(false),
                      Author_Comments: new FormControl(''),
                      articleId: new FormControl(''),
                      /*comments: new FormGroup({

                      })*/
                    });

         this.draftForm = new FormGroup(
            {
              product_name: new FormControl(),
              id: new FormControl(),
              belongstatus : new FormControl(),
              contryauth: new FormControl(),
              country_name: new FormControl(),
              Publication_Date: new FormControl(),
              Product_Approval_Date: new FormControl(),
              Launch_Date:new FormControl(),
              Withdraw_Date: new FormControl(),
              route_admin: new FormControl(),
              form_drug:new FormControl(),
              drug_brand:new FormControl(),
              rel_drug:new FormControl(),
              Author_Comments: new FormControl(),
              comments: new FormControl()

             /* drug_Start_Date: new FormControl(),
              drugApproval_Date : new FormControl(),
              drugWithdrawn_Date: new FormControl(),
             
              Formulation_of_Drug: new FormControl(),
              Brand_drug_mentioned: new FormControl(),
            
              route_admin:new FormControl(),*/
             
             
              
             
            }
          )

        this.reviewForm = new FormGroup(
            {
              product_name: new FormControl(),
              id: new FormControl(),
              belongstatus : new FormControl(),
              contryauth: new FormControl(),
              Publication_Date: new FormControl(),
              Product_Approval_Date: new FormControl(),
              Launch_Date:new FormControl(),
              Withdraw_Date: new FormControl(),
              drug_Start_Date: new FormControl(),
              drugApproval_Date : new FormControl(),
              drugWithdrawn_Date: new FormControl(),
              administration_of_Drug: new FormControl(),
              Formulation_of_Drug: new FormControl(),
              Brand_drug_mentioned: new FormControl(),
              Author_Comments: new FormControl(),
              route_admin:new FormControl(),
              form_drug:new FormControl(),
              drug_brand:new FormControl(),
              rel_drug:new FormControl(),
            }
          );

        this.commentForm = new FormGroup({
          id:new FormControl(),
          comment : new FormControl()
        });

       }

closemodal() {
 $('#draftModal').hide();
 $('#submitedModal').hide();
 $('#commentArchive').hide();
 this.draftForm.reset();
 this.reviewForm.reset();
 this.commentForm.reset();
 this.articleform.reset();

}


  fullview(x){
    console.log("clicked on full view",x)
     // $('#summarydraftModal').show();
     let data=x;
     $('#draftModal').show();
      this.authordata = data.author;
      this.modaltitle=data.result_title;
      this.abstractdata = data.result_abstract;
     /*this.draftartData['id']=data.id;
      this.draftartData['belongstatus']=data.belongstatus;
      this.draftartData['contryauth']=data.contryauth;
      this.draftartData['country_name']=data.country_name;
      this.draftartData['Publication_Date']=data.Publication_Date;
      //this.draftartData['Launch_Date']=data.Launch_Date;
      this.draftartData['Withdraw_Date']=data.Product_Withdrawn_Date;
      this.draftartData['Product_Approval_Date']=data.Product_Approval_Date;
      this.draftartData['route_admin']=data.administration_of_Drug;
      this.draftartData['form_drug']=data.Formulation_of_Drug;
      this.draftartData['drug_brand']=data.Brand_drug_mentioned;
      this.draftartData['rel_drug']=data.administration_of_Drug;
      this.draftartData['Author_Comments']=data.Author_Comments;
      this.draftartData['product_name']=data.product_name;
      this.draftartData['status']=data.status;
      this.draftartData['Launch_Date']=data.product_lauchDate*/


      this.draftartData['id']=data.id;
      this.draftartData['belongstatus']=data.belongstatus;
      this.draftartData['contryauth']=data.contryauth;
      this.draftartData['Publication_Date']=data.Publication_Date;
      this.draftartData['Product_Approval_Date']=data.Product_Approval_Date;
      this.draftartData['Withdraw_Date']=data.Product_Withdrawn_Date;
      this.draftartData['product_name']=data.product_name;
      this.draftartData['route_admin']=data.administration_of_Drug;
      this.draftartData['form_drug']=data.Formulation_of_Drug;
      this.draftartData['drug_brand']=data.Brand_drug_mentioned;
      this.draftartData['rel_drug']=data.rel_DrugNEvent;
      this.draftartData['Author_Comments']=data.Author_Comments;
      this.draftartData['status']=data.status;
      this.draftartData['Launch_Date']=data.product_lauchDate;
      this.draftartData['comments']=this.mapcomments(data.id);

  }

  archivearticle(x){
    let data={"id":'',"archived":'yes'};
    data.id=x.id
    console.log("-----",x)
    this.researchdataService.archivearticle(data);
    this.successarchive();
    this.getdashboard();
  }
  unarchivearticle(x){
    let data={"id":'',"archived":'no'};
    data.id=x.id
    console.log("-----",x)
    this.researchdataService.unarchivearticle(data);
    this.successunarchive();
     this.getdashboard();
  }

 successarchive(){
     this.toastr.success('Article Archived', 'Sucess');
  }
successunarchive(){
     this.toastr.success('Article Unarchived', 'Sucess');
  }
  mapcomments(id){
    console.log("----id-----",id)
  this.selectedcomments=[];
    console.log("---",id)  
    for(var i=0;i<this.artcomments.length;i++){
      console.log("===",this.artcomments[i])
      console.log("===",this.artcomments[i].art_id)

      if(parseInt(this.artcomments[i].art_id)==id){
         console.log("====inside if",id)
         this.selectedcomments=this.artcomments[i].cmt_values.replace("[","").replace("]","").split(",");
         this.selectedcomments.forEach(item => this.commentselected.push(item));        
      }
    }
    console.log("map selected comment",this.selectedcomments)
    return this.selectedcomments.length?this.selectedcomments:[];
  
}

ischecked(i){
  console.log("clicked is check",i)
  return this.selectedcomments.filter(arrItem => parseInt(arrItem) == i+1).length;
}


getdashboard(){
  console.log("being")
  this.researchdataService.getsearchArt()
     .subscribe((res) => {
            console.log("-----summary res----",res)

             this.archivedata = [];
             this.reviewedata=[];
             this.unarchived=[];
             this.drafted=[];


             this.soucedata = res.searchresult;
             this.sourcedvalue=this.soucedata.length;
             this.artcomments=res.comments;
             this.comments=res.checklistComments;
             console.log("datas",this.data)
             for(var i=0;i<this.soucedata.length;i++){
               if(this.soucedata[i].archived=="yes"){
                 this.archivedata.push(this.soucedata[i])
                 console.log("----archive",this.soucedata[i])
                 this.archivevalue++;
               }
               if(this.soucedata[i].status=="submit for review" && this.soucedata[i].archived!="yes"){
                 this.reviewedata.push(this.soucedata[i])
                 this.reviewvalue++;
               }
               if(this.soucedata[i].archived=="no"){
                 this.unarchived.push(this.soucedata[i])
                 this.unarchivevalue++;
               }
               if(this.soucedata[i].status=="saved as drafted" && this.soucedata[i].archived!="yes"){
                 this.drafted.push(this.soucedata[i])
                 this.draftvalue++
               }

             }
             console.log("--archivedata---",this.archivedata)
               this.dtTrigger.next();
               this.spinner.hide();
           });
}
}
