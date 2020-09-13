import { Component, OnInit, ViewChild } from '@angular/core';
import { keys, findIndex, forEach } from "lodash";
import { AlertService } from "Service/alert.service";
import { Table } from "primeng/table";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-immunization-alerts',
  templateUrl: './immunization-alerts.component.html',
  styleUrls: ['./immunization-alerts.component.css']
})
export class ImmunizationAlertsComponent implements OnInit {
  @ViewChild('immunizationAlertTable', { static: true }) immunizationAlertTable: Table;

  constructor(public alertservice: AlertService,
    public toastr: ToastrService) { }


  //Variable Declarations
  immunizationAlertInput: any = {
    id: '', name: '', description: '', webReference: ''
  }
  rowData: any[] = [];
  primeData: any[] = [];
  columnPrime: any[] = [];
  filterColoumList: CommanFilterList = {};
  jsonData: any[] = [];
  selectedRow: any[] = [];
  rowIndex: any[] = [];
  TotalResults: number = 0;

  ngOnInit(): void {
    this.getImmunizationData();
  }


  //get data
  getImmunizationData() {
    this.jsonData = [];
    this.alertservice.getData()
      .subscribe((data: any): void => {
        console.log('getImmunizationData', data.data);
        this.jsonData = data.data;

        this.bindImmunizationData(this.jsonData)
      });
  }



  bindImmunizationData(data) {
    this.TotalResults = data.length;
    this.columnPrime = [
      { header: "Id", field: 'id' },
      { header: "Name", field: 'name' },
      { header: "Description", field: 'description' },
      { header: "Web Reference", field: 'webReference' },

    ];
    this.primeData = data;
    this.rowData = data;
    this.filterColoumList = this.getFilterSelectColoumn(this.primeData);
    console.log('prime data fitler', this.filterColoumList);


  }

  getRow() {
    console.log('this is the row', this.selectedRow)
  }


  getFilterSelectColoumn(dataList: any[]) {
    let columnList: any = {};

    if (dataList.length == 0) return [];

    let tempCol = keys(dataList[0]);
    tempCol.forEach((value, key) => (columnList[value] = []));

    dataList.forEach((value: any[], key) => {
      forEach(value, (v, k) => {
        if (columnList[k].length == 0) {
          columnList[k].push({ label: value[k], value: value[k] });
          return true;
        }

        if (
          findIndex(columnList[k], function (v2) {
            return v2["value"] == value[k];
          }) == -1
        ) {
          columnList[k].push({ label: value[k], value: value[k] });
        }
      });
    });

    return columnList;
  }

  resetFilter() {
    this.immunizationAlertTable.reset();
    this.immunizationAlertInput = {
      id: '', name: '', description: '', webReference: ''
    }
  }

  deleteData() {
    // console.log('json data 1', this.primeData)
    // console.log('selected row', this.selectedRow)
    this.selectedRow.forEach(ele => {
      this.rowIndex.push({ 'id': ele.id })
    })

    // console.log('json data 2', this.rowIndex)
    this.rowIndex.forEach(ele => {
      // this.primeData.splice(ele.id, 1);  
      this.primeData = this.primeData.filter(data => data.id !== ele.id);
    })

    // console.log('json data 2', this.primeData)
    this.selectedRow = [];
    this.rowIndex = [];
    this.bindImmunizationData(this.primeData)
    this.toastr.success('Record deletd successfully', 'Delete Success', { timeOut: 5000 });
  }

  idList: number[] = [];
  AddformData(formData) {

    this.primeData.forEach(element => {
      this.idList.push(element.id)
    });

    this.idList.sort((a, b) => b - a)
    // console.log('addformdat idList:', this.idList)

    this.primeData.push({ 'id': this.idList[0] + 1, 'name': formData.Name, 'description': formData.Description, 'webReference': formData.webReferences })

    // console.log('AddformData data 2', this.primeData)
    this.bindImmunizationData(this.primeData)

    this.toastr.success('Record added successfully', 'Add Success', { timeOut: 5000 });
  }

};




//Interface

export interface CommanFilterList {
  id?: any,
  name?: any,
  description?: any,
  webReference?: any
}