import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MemeService } from '../meme-templates.services';
import { MemeModal } from '../meme.modal';

@Component({
  selector: 'app-meme-editor',
  templateUrl: './meme-editor.component.html',
  styleUrls: ['./meme-editor.component.css'],
})
export class MemeEditorComponent implements OnInit {
  @ViewChild('img') image: ElementRef;
  @ViewChild('svgRef') svgRef: ElementRef;
  @ViewChild('svgtxt') svgtxt: ElementRef;
  memeObj: MemeModal;
  topObj: {
    text: string;
    fontSize: number;
    max_words_per_line: number;
    x_pos: number;
    y_pos: number;
    max_width: number;
  } = {
    text: 'Enter Top text',
    fontSize: 20,
    max_words_per_line: 2,
    x_pos: 10,
    y_pos: 10,
    max_width: 300,
  };
  bottomObj: { text: string; fontSize: number } = {
    text: 'Enter the Botton Text',
    fontSize: 40,
  };
  // el: any;
  constructor(
    private route: ActivatedRoute,
    private memeService: MemeService
  ) {}
  ngOnInit(): void {
    this.memeObj = this.memeService.getMemeByTitle(
      this.route.snapshot.params['title']
    );
  }
  ngAfterViewInit(): void {}

  nxtLineShifter() {
    this.svgtxt.nativeElement.innerHTML = '';
    const wordsList = this.topObj.text.trim().split(' ');
    // some way to add text into hte dom and check if its length is greater then our max width, if it is remove a word and add to a new element
    let index = 0;
    const spanEle = this.createTspan(' ');
    this.svgtxt.nativeElement.appendChild(spanEle);
    while (index < wordsList.length) {
      // ADD A WORD TO THE LAST EL .
      // IF THEN LENGTH IS GREATER WIDTH THEN REMOVE TEH LAST EL AND CREATE A NEW TSPAN AND APPEDN WORD TO THAT
      // ELSE : CONTUNUE
      const lastEle = this.svgtxt.nativeElement.lastChild;
      let lastEleText = lastEle.textContent;
      lastEle.textContent = lastEleText + ' ' + wordsList[index];
      const lastElementWidth = lastEle.getBBox().width;
      if (lastElementWidth > this.topObj.max_width) {
        lastEle.textContent = lastEleText;
        const newTxtEl = this.createTspan(wordsList[index]);
        this.svgtxt.nativeElement.appendChild(newTxtEl);
      }
      index++;
    }
  }

  createTspan(txt, beforeEle = null) {
    var rect;
    if (!beforeEle) {
      rect = { width: 0 };
    } else {
      rect = beforeEle.getBBox();
    }
    const tempSpan = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'tspan'
    );
    tempSpan.classList.add('parent');
    // tempSpan.setAttributeNS(null, 'dx', `${-1 * rect.width}`);
    tempSpan.setAttributeNS(null, 'x', `${this.topObj.x_pos}`);
    tempSpan.setAttributeNS(null, 'dy', `${this.topObj.fontSize}`);

    tempSpan.textContent = txt;
    tempSpan.style.outline = '2px solid red';
    return tempSpan;
  }

  onFontSize(e) {
    let a = e.target.value;
    this.topObj.fontSize = a;
    this.bottomObj.fontSize = a;
    this.svgtxt.nativeElement.setAttributeNS(null, 'font-size', `${a}px`);
    this.nxtLineShifter();
  }
  onTextChange(e) {
    this.topObj.text = e.target.value;
    this.nxtLineShifter();
  }
  onWordsChange(e) {
    this.topObj.max_width = parseInt(e.target.value);

    this.nxtLineShifter();
  }
}
