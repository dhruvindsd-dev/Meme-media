import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemeEditorTextComponent } from './meme-editor-text.component';

describe('MemeEditorTextComponent', () => {
  let component: MemeEditorTextComponent;
  let fixture: ComponentFixture<MemeEditorTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemeEditorTextComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemeEditorTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
