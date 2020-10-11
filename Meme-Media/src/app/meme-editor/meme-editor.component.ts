import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-meme-editor',
  templateUrl: './meme-editor.component.html',
  styleUrls: ['./meme-editor.component.css'],
})
export class MemeEditorComponent implements OnInit {
  @ViewChild('img') image: ElementRef;
  @ViewChild('svgRef') svgRef: ElementRef;
  @ViewChild('svgtxt') svgtxt: ElementRef;

  topObj: {
    text: string;
    fontSize: number;
    max_words_per_line: number;
    x_pos;
    y_pos;
  } = {
    text: 'Enter Top text',
    fontSize: 20,
    max_words_per_line: 2,
    x_pos: 10,
    y_pos: 10,
  };
  bottomObj: { text: string; fontSize: number } = {
    text: 'Enter the Botton Text',
    fontSize: 40,
  };
  el: any;
  constructor() {}
  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.onSvgLoad();
  }
  onSvgLoad() {
    let topObj = this.topObj;
    var svg = this.svgRef.nativeElement;
    svg.addEventListener('mousedown', startDrag);
    svg.addEventListener('mousemove', drag);
    svg.addEventListener('mouseup', endDrag);
    svg.addEventListener('mouseleave', endDrag);
    var selectedElement: any = false;
    var offset: any = { x: 0, y: 0 };

    function mousepos(evt) {
      var ctm = svg.getScreenCTM();
      return {
        x: (evt.clientX - ctm.e) / ctm.a,
        y: (evt.clientY - ctm.f) / ctm.d,
      };
    }
    function startDrag(evt) {
      if (evt.target.classList.contains('draggable')) {
        selectedElement = evt.target;
        offset = mousepos(evt);
        offset.x -= parseFloat(selectedElement.getAttributeNS(null, 'x'));
        offset.y -= parseFloat(selectedElement.getAttributeNS(null, 'y'));
      } else if (evt.target.classList.contains('parent')) {
        selectedElement = evt.target.parentElement;
        offset = mousepos(evt);
        offset.x -= parseFloat(selectedElement.getAttributeNS(null, 'x'));
        offset.y -= parseFloat(selectedElement.getAttributeNS(null, 'y'));
      }
      selectedElement.classList.add('highlight-el');
    }
    function drag(evt) {
      if (selectedElement) {
        evt.preventDefault();
        var coord = mousepos(evt);
        selectedElement.setAttributeNS(null, 'x', coord.x - offset.x);
        selectedElement.setAttributeNS(null, 'y', coord.y - offset.y);
        // console.log(selectedElement.children);
        if (selectedElement.children) {
          topObj.x_pos = coord.x - offset.x;
          for (let item of selectedElement.children) {
            item.setAttributeNS(null, 'x', coord.x - offset.x);
          }
        }
      }
    }
    function endDrag(evt) {
      if (selectedElement) selectedElement.classList.remove('highlight-el');
      selectedElement = null;
    }
  }

  nxtLineShifter() {
    this.svgtxt.nativeElement.innerHTML = '';

    const wordsList = this.topObj.text.trim().split(' ');

    const chunked_arr = [];
    let index = 0;
    while (index < wordsList.length) {
      chunked_arr.push(
        wordsList.slice(index, index + this.topObj.max_words_per_line)
      );
      index += this.topObj.max_words_per_line;
    }
    console.log(chunked_arr);

    let before_ele = null;
    for (let i of chunked_arr) {
      const spanEle = this.createTspan(i.join(' ').trim(), before_ele);
      this.svgtxt.nativeElement.appendChild(spanEle);
      before_ele = spanEle;
      console.log(i.join(' ').trim());
    }
  }

  createTspan(txt, beforeEle) {
    var rect;
    if (!beforeEle) {
      rect = { width: 0 };
    } else {
      rect = beforeEle.getBBox();
    }
    console.log(rect);

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
    let a = e.target.value;
    this.topObj.text = a;
    this.nxtLineShifter();
  }
}
