import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { GitService } from '../services/git.service';
import { GridOptions } from "ag-grid-community";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

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
        /*headerName: '', width: 30, checkboxSelection: true, sortable: false,
        suppressMenu: true, pinned: true,*/
        field: "make" 
      }
  ];
  this.rowData = [
      { make: "Toyota"},
      { make: "Ford"},
      { make: "Porsche"}
  ];
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
  }

  submit(){
    this.repositorios = [];
    const result: usuario = Object.assign({}, this.form.value);
    this.gitService.usuario = result.nome;
    this.gitService.getUserData()
      .subscribe(users => {
        //console.log(users);
        this.dados.push(users);
        
        console.log(this.dados);

      });

    
    this.gitService.getUserRepos()
      .subscribe(users => {
        //console.log(users);
        this.repositorios.push(users)
        console.log(this.repositorios);
        let newRow = [];
        this.repositorios[0].forEach(element => {

          newRow.push({ make: element.name});
          this.rowData = newRow;
        });
      });
  }

}
export class usuario {
  nome: string = ''
}
