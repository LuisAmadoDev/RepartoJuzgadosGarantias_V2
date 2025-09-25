import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShowComponent } from './pages/show/show.component';
import { EditComponent } from './pages/edit/edit.component';
import { GenericTableComponent } from './components/generic-table/generic-table.component';

const routes: Routes = [
  {path: '', component: ShowComponent},
  {path: 'update/:id', component: EditComponent},
  {path: 'generic-table', component: GenericTableComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
