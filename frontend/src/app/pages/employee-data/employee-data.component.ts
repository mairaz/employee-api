import { ChangeDetectionStrategy, Component, ElementRef, inject, Signal, signal, ViewChild, computed } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-employee-data',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './employee-data.component.html',
  styleUrl: './employee-data.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeDataComponent {

  isEdit = false;

  @ViewChild('empModal') empModal: ElementRef | undefined;


  employesService = inject(EmployeeService);
  form = inject(FormBuilder).group({
    employeeId: [0],
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: [''],
    contantNo: ['', [Validators.required]],
    city: [''],
    address: ['']
  });
  employeesList = this.employesService.employeesList;
  employeesListError = this.employesService.employeesListError;


  ngOnInit() {
    this.employesService.getAllEmployees();
  }
  addEmployee() {
    this.openModal();
  }

  onSubmit() {
    if (this.isEdit) {
      this.employesService.editEmployee(this.form.value as Employee);
    } else {
      this.employesService.addEmployee(this.form.value as Employee);
    }
    this.closeModal();
  }

  onEdit(employee: Employee) {
    this.isEdit = true;
    this.form.patchValue(employee);
    this.openModal();
  }

  delete(id: number) {
    this.employesService.deleteEmployee(id);
  }


  openModal() {
    if (this.empModal) {
      this.empModal.nativeElement.style.display = 'block';
    }
  }
  closeModal() {
    this.isEdit = false;
    this.form.reset();
    this.form.patchValue({ employeeId: 0 });
  }

}

export interface Employee {
  employeeId: number;
  firstName: string;
  lastName: string;
  email?: string | null,
  contantNo: string,
  city?: string | null,
  address?: string | null
}
