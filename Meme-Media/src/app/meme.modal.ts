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
  constructor(txt: string, x: number = 0, y: number = 0) {
    this.text = txt;
    this.x = x;
    this.y = y;
  }
}
