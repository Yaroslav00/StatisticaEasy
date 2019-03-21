import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import {ApiService} from '../../api.service';
import * as Highcharts from 'highcharts';
@Component({
  selector: 'app-reg-dnn',
  templateUrl: './reg-dnn.component.html',
  styleUrls: ['./reg-dnn.component.css']
})
export class RegDnnComponent implements OnInit {

  uploader: FileUploader = new FileUploader(
    { url: 'http://127.0.0.1:8000/regression_info/', removeAfterUpload: false, autoUpload: true
       }
    );
    info:any[];
    Highcharts = Highcharts;
    array: string = "";
    array_dnn: string = "";
    updateFlag:boolean;
    points_dnn: number[][] = [];
    points: number[][] = [];
 
    optFromInputString: string;
    chartOptions: Highcharts.Options;
    predict(){
      this.optFromInputString = `
    {
      "title": { "text": "Highcharts chart" },
      "xAxis": {"min":${this.points[0][0]}},
      "series":[{
        "data": [${this.array.slice(0,-1)}],
        "zones": [{
          "value": 1000,
          "dashStyle": "solid",
          "color": "black"
        }]
  
      },{
        "data": [${this.array_dnn.slice(0,-1)}],
        "zones": [{
          "value": 1000,
          "dashStyle": "solid",
          "color": "red"
        }]
      }]
    }
    `;


    this.chartOptions =
         JSON.parse(this.optFromInputString);
     
    
    
    this.updateFlag = true;
    
  }
  constructor(private api: ApiService) {
    this.api  = api;
   }

   getDnn(){
    this.getSomeInfo();
  }
  getSomeInfo() {
    this.api.getDnn().subscribe(
     (data: any[]) => {
           this.info = data;
            console.log(this.info)
            this.updateFlag = false;
            this.points = [];
            this.points_dnn = [];
            this.array = "";
            this.array_dnn = "";
           let chart_dnn_x:number[] = this.info[0].chart_dnn_x;
            let  chart_dnn_y:number[] = this.info[1].chart_dnn_y;
            let chart_x:number[]  = this.info[2].chart_x;
            let chart_y:number[] = this.info[3].chart_y;
            for(let i in chart_x)
            {
              this.points.push([chart_x[i],chart_y[i]]);
              
            }
            this.points_dnn.push([chart_x[chart_x.length-1],chart_y[chart_x.length-1]])
            for(let i in chart_dnn_x)
            {
              this.points_dnn.push([chart_dnn_x[i],chart_dnn_y[i]]);
              
            }
            for (let i of this.points_dnn){
              this.array_dnn += '['+i.join()+'],';
            }
            
            for (let i of this.points){
              this.array += '['+i.join()+'],';
            }
            console.log(this.points_dnn[0][0])
            console.log(this.array_dnn.slice(0,-1));
            let min = 
            this.optFromInputString = `
            {
              "title": { "text": "Highcharts chart" },
              "xAxis": {"min":${this.points[0][0]}},
              "series": [{
                "data": [${this.array.slice(0,-1)}],
                "zones": [{
                  "value": 1000,
                  "dashStyle": "solid",
                  "color": "black"
                }]
              }, {
                "data": []
              }]
            }
            `;
            this.chartOptions = JSON.parse(this.optFromInputString);
           
     },
       error => {
       console.log(error);
     }
   );
 }
  ngOnInit() {
  }

}
