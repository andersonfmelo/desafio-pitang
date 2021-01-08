import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { GitService } from '../services/git.service';
import { GridOptions } from "ag-grid-community";
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-last-search',
  templateUrl: './last-search.component.html',
  styleUrls: ['./last-search.component.scss']
})
export class LastSearchComponent implements OnInit {

  public gridOptions:GridOptions;
  public rowData:any[];
  public columnDefs:any[];

  form!: FormGroup;
  dados = [];
  repositorios = [];
  nome = '';

  constructor(private gitService:GitService, private formBuilder: FormBuilder) { 
    this.gridOptions = <GridOptions>{
      onGridReady: () => {
          this.gridOptions.api.sizeColumnsToFit();
      }
  };
  this.columnDefs = [
      { 
        headerName: 'Ultimas Pesquisas', 
        sortable: false,
        suppressMenu: true, 
        pinned: true,
        field: "lastsearch" 

      },

  ];
  this.rowData = [];
  }

  ngOnInit(): void {
    this.createForm();
  }
  private createForm() {

    this.form = this.formBuilder.group({
      nome: ['', Validators.required],
    });
    
    let newUser = JSON.parse(localStorage.getItem('lastsearch'));
    if(newUser!=null)this.rowData = newUser;

  }
}
export class usuario {
  nome: string = ''
}
