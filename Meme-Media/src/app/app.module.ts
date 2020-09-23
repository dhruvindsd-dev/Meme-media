import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MemeEditorComponent } from './meme-editor/meme-editor.component';
import { UserComponent } from './user/user.component';
import { FeedComponent } from './feed/feed.component';
import { HeaderComponent } from './header/header.component';
import { Route, RouterModule } from '@angular/router';
import { AboutusComponent } from './aboutus/aboutus.component';

const appRoute: Route[] = [
  { path: '', component: HomeComponent },
  { path: 'user/:type', component: UserComponent },
  { path: 'meme-making', component: MemeEditorComponent },
  { path: 'feed', component: FeedComponent },
  { path: 'about-us', component: AboutusComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MemeEditorComponent,
    UserComponent,
    FeedComponent,
    HeaderComponent,
    AboutusComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, RouterModule.forRoot(appRoute)],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
