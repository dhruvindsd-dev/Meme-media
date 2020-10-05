import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemeTemplateComponent } from './meme-template.component';

describe('MemeTemplateComponent', () => {
  let component: MemeTemplateComponent;
  let fixture: ComponentFixture<MemeTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemeTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemeTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
