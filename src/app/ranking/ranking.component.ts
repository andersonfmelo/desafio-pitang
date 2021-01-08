
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { GitService } from '../services/git.service';
import { GridOptions } from "ag-grid-community";
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss']
})
export class RankingComponent implements OnInit {

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
        headerName: 'User', width: 80, sortable: false,
        suppressMenu: true, pinned: true,
        field: "repo" 

      },
      {
        headerName: 'URL',
        field: "url" 
      }
  ];
  this.rowData = [];
  }

  ngOnInit(): void {
    this.createForm();
  }
  private createForm() {
    // this.form = this.formBuilder.group({
    //   nome: ['', Validators.required],
    //   cnpj: ['', Validators.required],
    //   responsavel: ['', Validators.required],
    // });
    this.form = this.formBuilder.group({
      nome: ['', Validators.required],
    });
    this.gitService.getUsers()
    .subscribe(users => {
      //console.log(users);
      this.repositorios.push(users)
      console.log(this.repositorios);
      let newRow = [];
      this.repositorios[0].forEach(element => {

        newRow.push({ repo: element.login, url: element.html_url});
        this.rowData = newRow;
      });
    });
  }

  submit(){
    this.repositorios = [];


  }

}
export class usuario {
  nome: string = ''
}
