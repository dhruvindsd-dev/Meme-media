import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MemeEditorComponent } from './meme-editor/meme-editor.component';
import { UserComponent } from './user/user.component';
import { FeedComponent } from './feed/feed.component';
import { HeaderComponent } from './header/header.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { MemeTemplateComponent } from './meme-template/meme-template.component';
import { MemeService } from './meme-templates.services';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MemeEditorComponent,
    UserComponent,
    FeedComponent,
    HeaderComponent,
    AboutusComponent,
    MemeTemplateComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [MemeService], // only for injectables
  bootstrap: [AppComponent],
})
export class AppModule {}
