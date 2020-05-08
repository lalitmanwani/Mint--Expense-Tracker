import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private httpClient: HttpClient) {}

  addExpenseRequest(data: any): Observable<any> {
    const token = localStorage.getItem('id_token');

    console.log(token);
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.httpClient.post<any>('http://localhost:3000/users/add', data, {
      headers: {
        Authorization: token,
      },
    });
  }

  getExpenses() {
    const token = localStorage.getItem('id_token');

    let headers = new HttpHeaders();
    return this.httpClient.get('http://localhost:3000/users/list', {
      headers: {
        Authorization: token,
      },
    });
  }

  deleteExpense(data: any): Observable<any> {
    const token = localStorage.getItem('id_token');

    let headers = new HttpHeaders();
    return this.httpClient.post<any>(
      'http://localhost:3000/users/delete',
      data,
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }

  updateExpense(data: any): Observable<any> {
    const token = localStorage.getItem('id_token');

    let headers = new HttpHeaders();
    return this.httpClient.put<any>(
      'http://localhost:3000/users/update',
      data,
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }

  addIncomeRequest(data: any): Observable<any> {
    const token = localStorage.getItem('id_token');

    console.log(token);
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.httpClient.post<any>(
      'http://localhost:3000/users/addincome',
      data,
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }

  getIncome() {
    const token = localStorage.getItem('id_token');

    let headers = new HttpHeaders();
    return this.httpClient.get('http://localhost:3000/users/listincome', {
      headers: {
        Authorization: token,
      },
    });
  }

  deleteIncome(data: any): Observable<any> {
    const token = localStorage.getItem('id_token');

    let headers = new HttpHeaders();
    return this.httpClient.post<any>(
      'http://localhost:3000/users/deleteincome',
      data,
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }

  updateIncome(data: any): Observable<any> {
    const token = localStorage.getItem('id_token');

    let headers = new HttpHeaders();
    return this.httpClient.put<any>(
      'http://localhost:3000/users/updateincome',
      data,
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }
}
