import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { RouterModule, Routes } from '@angular/router';
//Angulars
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';

//UI interface
import { NavbarComponent } from '../ui/navbar/navbar.component';
import { HomepageComponent } from '../ui/homepage/homepage.component';
import { PageNotFoundComponent } from '../ui/page-not-found/page-not-found.component';
import { BlogComponent } from '../ui/blog/blog.component';


const appRoutes: Routes = [
  {
    path: '',
    component: HomepageComponent
  },
  {
    path: 'blog',
    component: BlogComponent
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    RouterModule.forRoot(
      appRoutes
    ),
    HttpModule

  ],
  exports: [RouterModule, NavbarComponent],
  declarations: [
    HomepageComponent,
    PageNotFoundComponent,
    NavbarComponent,
    BlogComponent
  ]
})
export class AppRoutingModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AppRoutingModule
    };
  }
}
