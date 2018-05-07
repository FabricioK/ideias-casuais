import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms';
import { NgxEditorModule } from 'ngx-editor';

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
import { NovoPostComponent } from '../ui/novo-post/novo-post.component';

const appRoutes: Routes = [
  {
    path: '',
    component: HomepageComponent
  },
  {
    path: 'novo-post',
    component: NovoPostComponent,
  },
  {
    path: 'blog',
    component: BlogComponent
  },
  { path: '**', component: PageNotFoundComponent }
];

/*AdsenseModule.forRoot({
  adClient: 'ca-pub-3591479855211665',
  adSlot: 2500655669,
  adFormat: "auto" ,
  pageLevelAds: true
}),*/

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    HttpModule,
    HttpClientModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    NgxEditorModule,
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
    BlogComponent,
    NovoPostComponent,
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
