import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShowComponent } from './pages/show/show.component';
import { EditComponent } from './pages/edit/edit.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { HttpClientModule } from '@angular/common/http';
import { GenericTableComponent } from './components/generic-table/generic-table.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { CaseFilterPipe } from './pipes/case-filter.pipe';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { LoginComponent } from './pages/login/login.component';
import { UserFormComponent } from './components/users/user-form/user-form.component';
import { UserTableComponent } from './components/users/user-table/user-table.component';
import { UserShowComponent } from './pages/users/user-show/user-show.component';
import { UserEditComponent } from './pages/users/user-edit/user-edit.component';



@NgModule({
  declarations: [
    AppComponent,
    ShowComponent,
    EditComponent,
    GenericTableComponent,
    CaseFilterPipe,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    UserFormComponent,
    UserTableComponent,
    UserShowComponent,
    UserEditComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule 
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
