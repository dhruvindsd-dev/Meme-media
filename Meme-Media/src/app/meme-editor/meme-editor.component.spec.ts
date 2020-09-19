import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemeEditorComponent } from './meme-editor.component';

describe('MemeEditorComponent', () => {
  let component: MemeEditorComponent;
  let fixture: ComponentFixture<MemeEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemeEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemeEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
