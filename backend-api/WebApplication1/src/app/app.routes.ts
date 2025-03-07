import { Routes } from '@angular/router';
import { EmployeeDataComponent } from './pages/employee-data/employee-data.component';
import { HomePageComponent } from './pages/employee-data/home-page/home-page.component';

export const routes: Routes = [
    {
        path:'',
        component:HomePageComponent
    },
    {
        path: 'employee-data',
        component: EmployeeDataComponent
    }

];
