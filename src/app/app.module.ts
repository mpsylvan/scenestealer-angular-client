import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
// angular material imports
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatCardModule } from "@angular/material/card";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { FormsModule } from "@angular/forms";
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';


//Components
import { UserRegisFormComponent } from './user-regis-form/user-regis-form.component';
import { UserLoginFormComponent } from './user-login-form/user-login-form.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { WelcomePageComponent } from "./welcome-page/welcome-page.component";
import { ProfileCardComponent } from './profile-card/profile-card.component';
import { SynopsisDialogComponent } from './synopsis-dialog/synopsis-dialog.component';
import { GenreDialogComponent } from './genre-dialog/genre-dialog.component';
import { DirectorDialogComponent } from './director-dialog/director-dialog.component';
import { NavbarComponent } from './navbar/navbar.component';


const AppRoutes: Routes = [
  { path: 'welcome', component: WelcomePageComponent },
  { path: 'movies', component: MovieCardComponent },
  { path: 'profile', component: ProfileCardComponent },
  { path: '', redirectTo: 'welcome', pathMatch: 'prefix' },
]



@NgModule({
  declarations: [
    AppComponent,
    UserRegisFormComponent,
    UserLoginFormComponent,
    MovieCardComponent,
    ProfileCardComponent,
    SynopsisDialogComponent,
    GenreDialogComponent,
    DirectorDialogComponent,
    NavbarComponent,
    WelcomePageComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatMenuModule,
    FormsModule,
    RouterModule.forRoot(AppRoutes),


  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
