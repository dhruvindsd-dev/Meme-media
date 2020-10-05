import { NgModule } from '@angular/core';
import {  Route, RouterModule } from '@angular/router';
import { AboutusComponent } from './aboutus/aboutus.component';
import { FeedComponent } from './feed/feed.component';
import { HomeComponent } from './home/home.component';
import { MemeEditorComponent } from './meme-editor/meme-editor.component';
import { UserComponent } from './user/user.component';

const routes: Route[] = [
  { path: '', component: HomeComponent },
  { path: 'user/:type', component: UserComponent },
  { path: 'meme-making', component: MemeEditorComponent },
  { path: 'feed', component: FeedComponent },
  { path: 'about-us', component: AboutusComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
