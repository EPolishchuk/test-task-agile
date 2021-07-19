import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PlaceComponent } from './components/place/place.component';
import { RegisterComponent } from './components/register/register.component';
import { PlaceItemComponent } from './components/place-item/place-item.component';

import { AuthGuard } from './guards/auth.guard';
import { LoggedInAuthGuard } from './guards/logged-in-auth.guard';

const appRoutes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [LoggedInAuthGuard],
  },
  { path: 'place', component: PlaceComponent, canActivate: [AuthGuard] },
];

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    DashboardComponent,
    PlaceComponent,
    PlaceItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
