import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { GitService } from '../services/git.service';
import { GridOptions } from "ag-grid-community";
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public usergridOptions:GridOptions;
  public userData:any[];
  public usercolumnDefs:any[];
  public gridOptions:GridOptions;
  public rowData:any[];
  public columnDefs:any[];
  public defaultColDef;
  form!: FormGroup;
  dados = [];
  repositorios = [];
  nome = '';

  constructor(private gitService:GitService, private formBuilder: FormBuilder) { 
    this.usergridOptions = <GridOptions>{
      onGridReady: () => {
          this.usergridOptions.api.sizeColumnsToFit();
      }
  };
  this.usercolumnDefs = [
    { 
      headerName: 'Dados de Usuario', 
      width: 80,
      field: "data" ,
      enableValue: true,
      suppressMenu: true,
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum',
    },
    { 
      headerName: 'Valor', 
      width: 80,
      field: "value" ,
      enableValue: true,
      suppressMenu: true,
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum',
    }
  ];
  this.defaultColDef = {
    sortable: true,
    resizable: true,
  };
  this.userData = [];
  
  this.gridOptions = <GridOptions>{
    onGridReady: () => {
        this.gridOptions.api.sizeColumnsToFit();
    }
};
  this.columnDefs = [
      { 
        headerName: 'Repositirios', 
        width: 80,
        suppressMenu: true, 
        pinned: true,
        field: "repo" ,
        enableValue: true,
        filter: 'agNumberColumnFilter',
        aggFunc: 'sum',
      },
      {
        headerName: 'Data da Ultima Atualização',
        field: "data" ,
        enableValue: true,
        suppressMenu: true,
        filter: 'agNumberColumnFilter',
        aggFunc: 'sum',
      }
  ];
  this.rowData = [];
  }

  ngOnInit(): void {
    //localStorage.removeItem("user");
    let newUser = JSON.parse(localStorage.getItem('user'));
    if(newUser!=null)this.userData = newUser;
    let newRow = JSON.parse(localStorage.getItem('row'));
    if(newRow!=null)this.rowData = newRow;
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
  }

  submit(){
    this.repositorios = [];
    this.dados = [];
    const result: usuario = Object.assign({}, this.form.value);
    this.gitService.usuario = result.nome;
    this.gitService.getUserData()
      .subscribe(users => {
        let newRow = [];
        //console.log(users);
        this.dados.push(users);
        if(this.dados[0].name!=null)newRow.push({data: "Nome", value: this.dados[0].name});
        if(this.dados[0].login!=null)newRow.push({data: "Usuario", value: this.dados[0].login });
        if(this.dados[0].email!=null)newRow.push({data: "E-Mail", value: this.dados[0].email });
        if(this.dados[0].followers!=null)newRow.push({data: "Seguidores", value: this.dados[0].followers });
        if(this.dados[0].twitter_username!=null)newRow.push({data: "Twitter", value: this.dados[0].twitter_username});
        this.userData = newRow;
        console.log(this.dados);
        localStorage.setItem('user', JSON.stringify(this.userData));
      });

    
    this.gitService.getUserRepos()
      .subscribe(users => {
        //console.log(users);
        this.repositorios.push(users)
        console.log(this.repositorios);
        let newRow = [];
        this.repositorios[0].forEach(element => {

          newRow.push({ repo: element.name, data: formatDate(element.updated_at, 'dd-MM-yyyy', 'en-US')});
          this.rowData = newRow;
          localStorage.setItem('row', JSON.stringify(this.rowData));
        });
      });
  }

}
export class usuario {
  nome: string = ''
}
