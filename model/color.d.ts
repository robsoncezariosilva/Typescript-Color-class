export class Color {
  public red: number;
  public green: number;
  public blue: number;
  public alpha: number;

  public constructor(color?: number = 0) {
    this.red = (color & 0xFF0000) >>> 16;
    this.green = (color & 0xFF00) >>> 8;
    this.blue = color & 0xFF;
    this.alpha = ((color & 0xFF000000) >>> 24) / 255;
  }

  public static fromARGB(a: number, r: number, g: number, b: number) : Color {
    return Object.assign(new Color(), {
      alpha : a,
      red : r,
      green : g,
      blue : b
    });
  }

  public static fromRGBO(r: number, g: number, b: number, o: number) : Color {
    return Object.assign(new Color(), {
      red : r,
      green : g,
      blue : b,
      alpha : Math.min(Math.round(o * 255), 255)
    });
  }

  public static fromRGB(r: number, g: number, b: number) : Color {
    return Color.fromRGBO(r, g, b, 1);
  }

  public static fromHex(hex: string) : Color {
    const color : RegExpExecArray = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

    return Object.assign(new Color(), {
      red : parseInt(color[1], 16),
      green : parseInt(color[2], 16),
      blue : parseInt(color[3], 16),
      alpha : 1
    });
  }

  public toHex() : string {
    return "#" + 
      this.red.toString(16).padStart(2, "0") + 
      this.green.toString(16).padStart(2, "0") + 
      this.blue.toString(16).padStart(2, "0");
  }

  public toRgb() : string {
    return `rgb(${this.red}, ${this.green}, ${this.blue})`;
  }

  public toRgba() : string {
    return `rgba(${this.red}, ${this.green}, ${this.blue}, ${this.alpha})`;
  }

  public withRed(r : number) : Color {
    return Color.fromARGB(this.alpha, r, this.green, this.blue);
  }

  public withGreen(g : number) : Color {
    return Color.fromARGB(this.alpha, this.red, g, this.blue);
  }

  public withBlue(b : number) : Color {
    return Color.fromARGB(this.alpha, this.red, this.green, b);
  }

  public withAlpha(a : number) : Color {
    return Color.fromARGB(a, this.red, this.green, this.blue);
  }

  public withOpacity(o : number) : Color {
    return Color.fromRGBO(this.red, this.green, this.blue, o);
  }
}