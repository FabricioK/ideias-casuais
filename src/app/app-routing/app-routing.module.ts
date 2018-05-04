import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { AdsenseModule } from 'ng2-adsense';

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
import { PostsService } from '../services/posts.service';

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
    AdsenseModule.forRoot({
      adClient: 'ca-pub-3591479855211665',
      pageLevelAds: true
    }),
    HttpModule

  ],
  exports: [RouterModule, NavbarComponent],
  declarations: [
    HomepageComponent,
    PageNotFoundComponent,
    NavbarComponent,
    BlogComponent
  ],
  providers: [PostsService]
})
export class AppRoutingModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AppRoutingModule
    };
  }
}
