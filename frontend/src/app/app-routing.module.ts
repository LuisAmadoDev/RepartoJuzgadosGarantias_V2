import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Páginas principales
import { LoginComponent } from './pages/login/login.component';
import { ShowComponent } from './pages/show/show.component';
import { EditComponent } from './pages/edit/edit.component';
import { GenericTableComponent } from './components/generic-table/generic-table.component';

// Páginas de usuarios
import { UserShowComponent } from './pages/users/user-show/user-show.component';
import { UserEditComponent } from './pages/users/user-edit/user-edit.component';

// Guard de autenticación
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  // Página de login (pública)
  { path: 'login', component: LoginComponent },

  // Páginas protegidas
  { path: 'show', component: ShowComponent, canActivate: [authGuard] },
  { path: 'update/:id', component: EditComponent, canActivate: [authGuard] },
  { path: 'generic-table', component: GenericTableComponent, canActivate: [authGuard] },

   // Páginas protegidas de usuarios
   /*
  {
    path: 'users',
    canActivate: [authGuard],
    children: [
      { path: 'show-user', component: UserShowComponent },
      { path: 'edit/:id', component: UserEditComponent },
    ],
  },*/
  
  { path: 'users/show-user', component: UserShowComponent, canActivate: [authGuard] },
  { path: 'users/edit/:id', component: UserEditComponent, canActivate: [authGuard] },


  // Ruta por defecto: redirigir al login
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
