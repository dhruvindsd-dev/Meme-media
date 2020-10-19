export class MemeModal {
  title: string;
  description: string;
  img_path: string;
  text: Text[];
  constructor(
    title: string,
    description: string,
    img_path: string,
    text: Text[] = [new Text('Enter some text ')]
  ) {
    this.title = title;
    this.description = description;
    this.img_path = img_path;
    this.text = text;
  }
}

export class Text {
  text: string;
  x: number;
  y: number;
  fontSize: number;
  fontWidth: number;
  constructor(
    txt: string,
    x: number = 0,
    y: number = 0,
    fontSize: number = 20,
    fontWidth: number = 200
  ) {
    this.text = txt;
    this.x = x;
    this.y = y;
    this.fontSize = fontSize;
    this.fontWidth = fontWidth;
  }
}
