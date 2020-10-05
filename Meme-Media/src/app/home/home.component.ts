import { Component, OnInit } from '@angular/core';
import { MemeService } from '../meme-templates.services';
import { MemeModal } from '../meme.modal';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  memesData: MemeModal[]
  constructor(private memeService: MemeService) { 

  }

  ngOnInit(): void {
    this.memesData = this.memeService.getAllMemes()    
  }

}
