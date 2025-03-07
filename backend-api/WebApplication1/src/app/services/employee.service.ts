import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { BehaviorSubject, catchError, Observable } from 'rxjs';
import { Employee } from '../pages/employee-data/employee-data.component';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private url = 'http://localhost:7200/api/EmployeeMaster';

  private employeesListSubject$ = new BehaviorSubject<Employee[]>([]);
  private rawEmployeesList = toSignal(this.employeesListSubject$, { initialValue: [] });
  employeesList = computed(() => signal(this.rawEmployeesList()).asReadonly()());

  employeesListError = signal<string | null>(null);

  http = inject(HttpClient);
  constructor() { }


  getAllEmployees() {
    this.http.get<Employee[]>(this.url).pipe(catchError((error) => {
      this.employeesListError.set(error.message);
      return [];
    }
    )).subscribe((data) => {
      this.employeesListSubject$.next(data);
    });
  }

  addEmployee(employee: Employee) {
    this.http.post(this.url, employee).subscribe((data) => {
      this.employeesListSubject$.next([...this.employeesListSubject$.value, data as Employee]);
    });
  }

  editEmployee(employee: Employee) {
    this.http.put(`${this.url}/${employee.employeeId}`, employee).pipe(
      catchError((error) => {
        this.employeesListError.set(error.message);
        return [];
      })
    ).subscribe((data) => {
      const index = this.employeesList().findIndex((emp) => emp.employeeId === employee.employeeId);
      this.employeesListSubject$.value[index] = { ...employee };
      this.employeesListSubject$.next([...this.employeesListSubject$.value]);
    });
  }

  deleteEmployee(employeeId: number) {
    this.http.delete(`${this.url}/${employeeId}`).pipe(
      catchError((error) => {
        this.employeesListError.set(error.message);
        return [];
      })
    ).subscribe(() => {
      this.employeesListSubject$.next(this.employeesListSubject$.value.filter((emp) => emp.employeeId !== employeeId));
    });
  }

}
