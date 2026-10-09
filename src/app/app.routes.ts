import { Routes } from '@angular/router';

export const routes: Routes = [

    {
        path: '',
        loadComponent: () =>
            import('./pages/home/home.component')
                .then(m => m.HomeComponent)
    },

    {
        path: 'productos',
        loadComponent: () =>
            import('./pages/products/product.component')
                .then(m => m.ProductComponent)
    },
    {
        path: 'recetas',
        loadComponent: () =>
            import('./pages/recetas/recetas.component')
                .then(m => m.RecetasComponent)
    },
    {
        path: 'about',
        loadComponent: () =>
            import('./pages/about/about.component')
                .then(m => m.AboutComponent)
    },
    {
        path: 'contact',
        loadComponent: () =>
            import('./pages/contact/contact.component')
                .then(m => m.ContactComponent)
    }

];
