import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./components/invoice-form/invoice-form').then(m => m.InvoiceForm)
    },
    {
        path: '**',
        redirectTo: ''
    }
];