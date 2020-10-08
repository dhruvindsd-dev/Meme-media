import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-meme-editor',
  templateUrl: './meme-editor.component.html',
  styleUrls: ['./meme-editor.component.css'],
})
export class MemeEditorComponent implements OnInit {
  @ViewChild('img') image: ElementRef;
  @ViewChild('svgRef') svgRef: ElementRef;
  @ViewChild('svgtxt') svgtxt: ElementRef;

  topObj: { text: string; fontSize: number; max_words_per_line: number } = {
    text: 'Enter Top text',
    fontSize: 40,
    max_words_per_line: 2,
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
      }
    }
    function endDrag(evt) {
      if (selectedElement) selectedElement.classList.remove('highlight-el');
      selectedElement = null;
    }
  }

  nxtLineShifter() {
    this.svgtxt.nativeElement.innerHTML = ''; 

    const wordsList = this.topObj.text.split(' ')
    const chunked_arr = []
    let index = 0 
    while (index < wordsList.length ){
      chunked_arr.push(wordsList.slice(index, index + this.topObj.max_words_per_line))
      index += this.topObj.max_words_per_line
    }
    for (let i of chunked_arr){
      const spanEle = this.createTspan(i.join(' '))
      this.svgtxt.nativeElement.appendChild(spanEle)
    }
    console.log(chunked_arr);
    
  }
  // const spanEle = this.createTspan('test eleemnt added', )
  // this.renderer.appendChild(this.svgtxt.nativeElement, spanEle)
  // this.svgtxt.nativeElement.appendChild(spanEle)
  // console.dir(spanEle);q

  createTspan(txt) {
    const rect = this.svgtxt.nativeElement.getBoundingClientRect();
    const tempSpan = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'tspan'
    );
    tempSpan.classList.add('parent');
    tempSpan.setAttributeNS(null, 'dx', `${-1 * rect.width}`);
    tempSpan.setAttributeNS(null, 'dy', `${this.topObj.fontSize}`);

    tempSpan.textContent = txt;
    return tempSpan;
  }

  onFontSize(e) {
    let a = e.target.value;
    this.topObj.fontSize = a;
    this.bottomObj.fontSize = a;
  }
  onTextChange(e) {
    let a = e.target.value;
    this.topObj.text = a;
    this.nxtLineShifter()
  }
}
