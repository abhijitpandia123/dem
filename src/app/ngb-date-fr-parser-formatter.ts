/*import {Injectable, Pipe} from '@angular/core';
import {DatePipe} from '@angular/common';
import {NgbDateParserFormatter, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

@Pipe({
    name: 'customDateFormat',
})

@Injectable()
export class customNgbDateParserFormatter extends NgbDateParserFormatter {
    /!*  transform(value: string) {
     let datePipe = new DatePipe('en-US');
     value = datePipe.transform(value, 'dd-MM-yyyy');
     return value;
     }*!/
    datePipe = new DatePipe('en-US');

    constructor(
        private dateFormatString: string) {
        super();
    }

    format(date: NgbDateStruct): string {
        if (date === null) {
            return '';
        }
        try {
            return this.datePipe.transform(new Date(date.year, date.month - 1, date.day), this.dateFormatString);
        } catch (e) {
            return '';
        }
    }

    parse(value: string): NgbDateStruct {
        let returnVal: NgbDateStruct;
        if (!value) {
            returnVal = null;
        } else {
            try {
                let dateParts = this.datePipe.transform(value, 'dd/MM/yyyy').split('/');
                returnVal = {year: parseInt(dateParts[2]), day: parseInt(dateParts[0]), month: parseInt(dateParts[1])};
            } catch (e) {
                returnVal = null;
            }
        }
        return returnVal;
    }
}*/

import {Injectable, OnInit} from "@angular/core";
import {NgbDateParserFormatter, NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";


function padNumber(value: number) {
    if (isNumber(value)) {
        return `0${value}`.slice(-2);
    } else {
        return "";
    }
}

function isNumber(value: any): boolean {
    return !isNaN(toInteger(value));
}

function toInteger(value: any): number {
    return parseInt(`${value}`, 10);
}


@Injectable()
export class NgbDateFRParserFormatter extends NgbDateParserFormatter implements OnInit {
    public dateFormat: any

    

    parse(value: string): NgbDateStruct {
        if (value) {
            const dateParts = value.trim().split('/');
            if (dateParts.length === 1 && isNumber(dateParts[0])) {
                return {year: toInteger(dateParts[0]), month: null, day: null};
            } else if (dateParts.length === 2 && isNumber(dateParts[0]) && isNumber(dateParts[1])) {
                return {year: toInteger(dateParts[1]), month: toInteger(dateParts[0]), day: null};
            } else if (dateParts.length === 3 && isNumber(dateParts[0]) && isNumber(dateParts[1]) && isNumber(dateParts[2])) {
                return {year: toInteger(dateParts[2]), month: toInteger(dateParts[1]), day: toInteger(dateParts[0])};
            }
        }
        return null;
    }

    format(date: NgbDateStruct): string {
        let stringDate: string = "";
        if (date) {
            // if(this.dateFormat == 'MM/dd/yyyy'){
            stringDate += (date.year) + "/";
            stringDate += isNumber(date.month) ? padNumber(date.month) + "/" : "";
            stringDate += isNumber(date.day) ? padNumber(date.day) + "" : "";


            //  }
            //  else if(this.dateFormat == 'dd/MM/yyyy'){
            //       console.log(" else date is",this.dateFormat)
            //       stringDate += isNumber(date.day) ? padNumber(date.day) + "/" : "";
            //       stringDate += isNumber(date.month) ? padNumber(date.month) + "/" : "";
            //       stringDate += date.year;
            //  }

        }

        return stringDate;
    }

    /*mmddFormat(date: NgbDateStruct): string {
        let stringDate: string = "";
        if(date) {
            stringDate += isNumber(date.month) ? padNumber(date.month) + "/" : "";
            stringDate += isNumber(date.day) ? padNumber(date.day) + "/" : "";
            stringDate += date.year;
        }

        return stringDate;
    }

    ddmmFormat(date: NgbDateStruct): string {
        let stringDate: string = "";
        if(date) {

            stringDate += isNumber(date.day) ? padNumber(date.day) + "/" : "";
            stringDate += isNumber(date.month) ? padNumber(date.month) + "/" : "";
            stringDate += date.year;
        }

        return stringDate;
    }*/
    ngOnInit() {
    }
}
