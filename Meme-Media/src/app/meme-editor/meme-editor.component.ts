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

  // nxtLineShifter() {
  //   this.svgtxt.nativeElement.innerHTML = '';

  //   const wordsList = this.topObj.text.trim().split(' ');

  //   const chunked_arr = [];
  //   let index = 0;
  //   while (index < wordsList.length) {
  //     chunked_arr.push(
  //       wordsList.slice(index, index + this.topObj.max_words_per_line)
  //     );
  //     index += this.topObj.max_words_per_line;
  //   }
  //   console.log(chunked_arr);

  //   let before_ele = null;
  //   for (let i of chunked_arr) {
  //     const spanEle = this.createTspan(i.join(' ').trim(), before_ele);
  //     this.svgtxt.nativeElement.appendChild(spanEle);
  //     before_ele = spanEle;
  //   }
  // }
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
