import { Component, Input, OnInit } from '@angular/core';
import { title } from 'process';

@Component({
  selector: '.app-meme-template',
  templateUrl: './meme-template.component.html',
  styleUrls: ['./meme-template.component.css']
})
export class MemeTemplateComponent implements OnInit {
  @Input('template') template = true
  @Input('title') title : string
  @Input('img_path') img_path : string 
  constructor() { }

  ngOnInit(): void {
  }

}
