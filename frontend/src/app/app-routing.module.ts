import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShowComponent } from './pages/show/show.component';
import { EditComponent } from './pages/edit/edit.component';
import { GenericTableComponent } from './components/generic-table/generic-table.component';
import { LoginComponent } from './pages/login/login.component';

import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  // Página de login (pública)
  { path: 'login', component: LoginComponent },

  // Páginas protegidas
  { path: 'show', component: ShowComponent, canActivate: [authGuard] },
  { path: 'update/:id', component: EditComponent, canActivate: [authGuard] },
  { path: 'generic-table', component: GenericTableComponent, canActivate: [authGuard] },

  // Ruta por defecto: redirigir al login
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
