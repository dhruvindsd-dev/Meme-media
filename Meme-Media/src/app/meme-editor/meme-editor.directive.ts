import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[editor]',
})
export class memeEditorSvgDirective implements OnInit {
  svg;
  selectedElement: any = false;
  offset = {
    x: 0,
    y: 0,
  };
  constructor(private elRef: ElementRef) {
    this.svg = elRef.nativeElement;
  }

  ngOnInit() {}

  ngAfterViewInit(): void {
    console.log('hey hey monica ', this.mousepos('test  '));
    this.onSvgLoad();
  }

  onSvgLoad() {
    this.svg.addEventListener('mousedown', (evt) => {
      this.startDrag(evt);
    });
    this.svg.addEventListener('mousemove', (evt) => {
      this.drag(evt);
    });
    this.svg.addEventListener('mouseup', (evt) => {
      this.endDrag(evt);
    });
    this.svg.addEventListener('mouseleave', (evt) => {
      this.endDrag(evt);
    });
  }
  mousepos(evt) {
    var ctm = this.svg.getScreenCTM();
    return {
      x: (evt.clientX - ctm.e) / ctm.a,
      y: (evt.clientY - ctm.f) / ctm.d,
    };
  }
  drag(evt) {
    if (this.selectedElement) {
      evt.preventDefault();
      var coord = this.mousepos(evt);
      this.selectedElement.setAttributeNS(null, 'x', coord.x - this.offset.x);
      this.selectedElement.setAttributeNS(null, 'y', coord.y - this.offset.y);
      if (this.selectedElement.children) {
        for (let item of this.selectedElement.children) {
          item.setAttributeNS(null, 'x', coord.x - this.offset.x);
        }
      }
    }
  }
  endDrag(evt) {
    if (this.selectedElement)
      this.selectedElement.classList.remove('highlight-el');
    this.selectedElement = null;
  }

  startDrag(evt) {
    if (evt.target.classList.contains('draggable')) {
      this.selectedElement = evt.target;
      this.offset = this.mousepos(evt);
      this.offset.x -= parseFloat(
        this.selectedElement.getAttributeNS(null, 'x')
      );
      this.offset.y -= parseFloat(
        this.selectedElement.getAttributeNS(null, 'y')
      );
    } else if (evt.target.classList.contains('parent')) {
      this.selectedElement = evt.target.parentElement;
      this.offset = this.mousepos(evt);
      this.offset.x -= parseFloat(
        this.selectedElement.getAttributeNS(null, 'x')
      );
      this.offset.y -= parseFloat(
        this.selectedElement.getAttributeNS(null, 'y')
      );
    }
    this.selectedElement.classList.add('highlight-el');
  }
}
