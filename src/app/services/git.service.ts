import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GitService {
  apiUrl = 'https://api.github.com';
  usuario = '';

  constructor(private http: HttpClient) { }
  getUserData() {
    return this.http.get(`${this.apiUrl}/users/${this.usuario}`);
  }
  getUserRepos() {
    return this.http.get(`${this.apiUrl}/users/${this.usuario}/repos`);
  }
}
