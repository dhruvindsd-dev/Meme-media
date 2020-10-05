import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MemeService } from '../meme-templates.services';
import { MemeModal } from '../meme.modal';

@Component({
  selector: '.app-meme-template',
  templateUrl: './meme-template.component.html',
  styleUrls: ['./meme-template.component.css'],
})
export class MemeTemplateComponent implements OnInit {
  @Input('description') description = true;
  @Input('title') title: string;
  @Input('img_path') img_path: string;
  meme: MemeModal;
  constructor(
    private memeService: MemeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.description) {
      this.route.params.subscribe((params) => {
        this.meme = this.memeService.getMemeByTitle(params['title']);
        if (!this.meme) {
          this.meme = new MemeModal(
            'Meme Not Found.',
            'You can either edit this meme or search for something appropriate.',
            'assets/images/meme_templates/meme_not_found.png'
          );
        }
      });
    }
  }
}
