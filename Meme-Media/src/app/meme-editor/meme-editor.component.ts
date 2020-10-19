import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MemeService } from '../meme-templates.services';
import { MemeModal } from '../meme.modal';

@Component({
  selector: 'app-meme-editor',
  templateUrl: './meme-editor.component.html',
  styleUrls: ['./meme-editor.component.css'],
})
export class MemeEditorComponent implements OnInit {
  @ViewChild('svgRef') svg;
  currentSelectedEl: number = 0;
  memeObj: MemeModal;
  @ViewChildren('textRef') svgTextRefs;
  dragEl: any = false;
  offset = {
    x: 0,
    y: 0,
  };

  constructor(
    private route: ActivatedRoute,
    private memeService: MemeService
  ) {}
  ngOnInit(): void {
    this.memeObj = this.memeService.getMemeByTitle(
      this.route.snapshot.params['title']
    );
  }
  ngAfterViewInit(): void {
    this.onSvgLoad();
    this.svgTextRefs._results.forEach((element, i) => {
      this.currentSelectedEl = i;
      this.nxtLineShifter();
      element.nativeElement.setAttributeNS(null, 'x', this.memeObj.text[i].x);
      element.nativeElement.setAttributeNS(null, 'y', this.memeObj.text[i].x);
    });
    this.currentSelectedEl = 0;
  }

  nxtLineShifter() {
    let currentTextEl = this.svgTextRefs._results[this.currentSelectedEl];
    // let tSpanX_toSet = currentTextEl.nativeElement.getBBox();
    currentTextEl.nativeElement.innerHTML = '';
    const wordsList = this.memeObj.text[this.currentSelectedEl].text
      .trim()
      .split(' ');
    let index = 0;
    const spanEle = this.createTspan('');
    currentTextEl.nativeElement.appendChild(spanEle);
    while (index < wordsList.length) {
      // ADD A WORD TO THE LAST EL .
      // IF THEN LENGTH IS GREATER WIDTH THEN REMOVE TEH LAST EL AND CREATE A NEW TSPAN AND APPEDN WORD TO THAT
      // ELSE : CONTUNUE
      const lastEle = currentTextEl.nativeElement.lastChild;
      let lastEleText = lastEle.textContent;
      lastEle.textContent = lastEleText + ' ' + wordsList[index];
      if (
        lastEle.getBBox().width >
        this.memeObj.text[this.currentSelectedEl].fontWidth
      ) {
        lastEle.textContent = lastEleText;
        const newTxtEl = this.createTspan(wordsList[index]);
        currentTextEl.nativeElement.appendChild(newTxtEl);
      }
      index++;
    }
  }

  createTspan(txt) {
    const tempSpan = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'tspan'
    );
    tempSpan.classList.add('parent');
    tempSpan.setAttributeNS(
      null,
      'x',
      `${this.memeObj.text[this.currentSelectedEl].x}`
    );
    tempSpan.setAttributeNS(
      null,
      'dy',
      `${this.memeObj.text[this.currentSelectedEl].fontSize}`
    );
    tempSpan.textContent = txt;

    return tempSpan;
  }

  onFontSize(e) {
    this.memeObj.text[this.currentSelectedEl].fontSize = e.target.value;
    this.nxtLineShifter();
  }
  onTextChange(e) {
    this.memeObj.text[this.currentSelectedEl].text = e.target.value;
    this.nxtLineShifter();
  }
  onWidthChange(e) {
    this.memeObj.text[this.currentSelectedEl].fontWidth = e.target.value;
    this.nxtLineShifter();
  }

  elSelector(el, elIndex) {
    this.currentSelectedEl = elIndex;
  }

  onBold() {
    const svgTxt = this.svgTextRefs._results[this.currentSelectedEl]
      .nativeElement;
    if (svgTxt.getAttributeNS(null, 'stroke') == 'black') {
      svgTxt.setAttributeNS(null, 'stroke', 'none');
    } else {
      svgTxt.setAttributeNS(null, 'stroke', 'black');
    }
  }
  onTextAlign() {
    const svgTxt = this.svgTextRefs._results[this.currentSelectedEl]
      .nativeElement;
    if (svgTxt.getAttributeNS(null, 'text-anchor') == 'start') {
      svgTxt.setAttributeNS(null, 'text-anchor', 'middle');
    } else {
      svgTxt.setAttributeNS(null, 'text-anchor', 'start');
    }
  }
  onShadow() {
    const svgTxt = this.svgTextRefs._results[this.currentSelectedEl]
      .nativeElement;
    if (svgTxt.style.textShadow == 'none') {
      svgTxt.style.textShadow = '2px 2px 20px rgba(0, 0, 0, 0.377)';
    } else {
      svgTxt.style.textShadow = 'none';
    }
  }

  onColor(el) {
    const svgTxt = this.svgTextRefs._results[this.currentSelectedEl]
      .nativeElement;
    svgTxt.setAttributeNS(null, 'fill', el.target.value);
  }
  // dragging logic
  onSvgLoad() {
    this.svg.nativeElement.addEventListener('mousedown', (evt) => {
      this.startDrag(evt);
    });
    this.svg.nativeElement.addEventListener('mousemove', (evt) => {
      this.drag(evt);
    });
    this.svg.nativeElement.addEventListener('mouseup', (evt) => {
      this.endDrag(evt);
    });
    this.svg.nativeElement.addEventListener('mouseleave', (evt) => {
      this.endDrag(evt);
    });
  }
  mousepos(evt) {
    var ctm = this.svg.nativeElement.getScreenCTM();
    return {
      x: (evt.clientX - ctm.e) / ctm.a,
      y: (evt.clientY - ctm.f) / ctm.d,
    };
  }

  drag(evt) {
    if (this.dragEl) {
      evt.preventDefault();
      var coord = this.mousepos(evt);
      this.dragEl.setAttributeNS(null, 'x', coord.x - this.offset.x);
      this.dragEl.setAttributeNS(null, 'y', coord.y - this.offset.y);
      if (this.dragEl.children) {
        for (let item of this.dragEl.children) {
          item.setAttributeNS(null, 'x', coord.x - this.offset.x);
        }
      }
      if (this.dragEl.classList.contains('text-el')) {
        this.memeObj.text[this.currentSelectedEl].x = coord.x - this.offset.x;
        this.memeObj.text[this.currentSelectedEl].y = coord.y - this.offset.y;
      }
    }
  }
  endDrag(evt) {
    if (this.dragEl) this.dragEl.classList.remove('highlight-el');
    this.dragEl = null;
  }

  startDrag(evt) {
    if (evt.target.classList.contains('draggable')) {
      this.dragEl = evt.target;
      this.offset = this.mousepos(evt);
      this.offset.x -= parseFloat(this.dragEl.getAttributeNS(null, 'x'));
      this.offset.y -= parseFloat(this.dragEl.getAttributeNS(null, 'y'));
    } else if (evt.target.classList.contains('parent')) {
      this.dragEl = evt.target.parentElement;
      this.offset = this.mousepos(evt);
      this.offset.x -= parseFloat(this.dragEl.getAttributeNS(null, 'x'));
      this.offset.y -= parseFloat(this.dragEl.getAttributeNS(null, 'y'));
    }
    this.dragEl.classList.add('highlight-el');
    console.log(this.dragEl.id);
    this.currentSelectedEl = parseInt(this.dragEl.id);
  }
}
