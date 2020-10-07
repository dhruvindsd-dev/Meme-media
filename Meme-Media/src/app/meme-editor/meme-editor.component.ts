import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SelectControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-meme-editor',
  templateUrl: './meme-editor.component.html',
  styleUrls: ['./meme-editor.component.css'],
})
export class MemeEditorComponent implements OnInit {
  @ViewChild('img') image: ElementRef;
  @ViewChild('svgRef') svgRef: ElementRef;
  topObj: { text: string; fontSize: string } = {
    text: 'Enter Top text',
    fontSize: '20',
  };
  bottomObj: { text: string; fontSize: string } = {
    text: 'Enter the Botton Text',
    fontSize: '20',
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
      spacingAlgo();
      selectedElement.classList.add('highlight-el');
    }
    function drag(evt) {
      if (selectedElement) {
        console.log(offset);
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

    function spacingAlgo() {
      const rect = selectedElement.getBoundingClientRect();
      console.log(rect);
      console.log((parseInt(topObj.fontSize) * topObj.text.length) / 2);
    }
  }

  onFontSize(e) {
    let a = e.target.value;
    this.topObj.fontSize = a + 'px';
    this.bottomObj.fontSize = a;
  }
  onTextChange(e) {
    let a = e.target.value;
    this.topObj.text = a;
  }
}
