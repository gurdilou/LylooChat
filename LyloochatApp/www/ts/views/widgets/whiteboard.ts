import {WhiteboardToolbar} from "./whiteboardToolbar";

/**
 * A white paperboard on which user can draw
 */
export class Whiteboard {
    private color = "#4E4E4E";
    private brush: Brush = Brush.Pencil;
    private brushSize: BrushSize = BrushSize.Medium;

    private canvas: HTMLCanvasElement = null;
    private parent: JQuery = null;
    private isDown = false;
    private canvasContext: CanvasRenderingContext2D = null;
    private toolbar: WhiteboardToolbar;
    private lastPoint: CanvasPointEvent;
    private canvasRect: ClientRect;

    constructor(containerId: string, withToolbar: boolean) {
        this.parent = $(containerId).first();
        this.canvas = <HTMLCanvasElement> this.parent.find(".whiteboard").first().get(0);
        if (withToolbar) {
            this.toolbar = new WhiteboardToolbar(this, this.parent);
        }
    }

    /**
     * Element must have is final position and parent when this method is called.
     * => It implies that animations are complete, add dom rendered
     */
    public show(): void {
        let self = this;
        if (this.canvas) {
            let offsetTop = this.canvas.offsetTop + this.parent.offset().top;
            let offsetLeft = this.canvas.offsetLeft + this.parent.offset().left;

            this.isDown = false;
            let jCanvas = $(this.canvas);
            this.canvasRect = this.canvas.getBoundingClientRect();
            jCanvas.attr("width", this.parent.width() + "px");
            jCanvas.attr("height", this.parent.height() + "px");

            $(window).resize(function () {
                self.canvas.toBlob((blob) => {
                    let newWidth = self.parent.width();
                    let newHeight = self.parent.height();
                    jCanvas.attr("width", newWidth + "px");
                    jCanvas.attr("height", newHeight + "px");

                    let img = new Image();
                    img.onload = function () {
                        self.canvasContext.drawImage(img,
                            0, 0, self.canvasRect.width, self.canvasRect.height,
                            0, 0, newWidth, newHeight);
                        self.canvasRect = self.canvas.getBoundingClientRect();
                    };
                    if (blob) {
                        img.src = URL.createObjectURL(blob);
                    }
                });
            });
            this.canvasContext = this.canvas.getContext("2d");

            jCanvas.on("touchstart", (e) => {
                let touchEvent = <TouchEvent>e.originalEvent;
                self.onDrawStart(touchEvent.touches[0].pageX - offsetLeft, touchEvent.touches[0].pageY - offsetTop);
            });
            jCanvas.on("touchmove", (e) => {
                // ctx.moveTo(canvasX, canvasY);
                let touchEvent = <TouchEvent>e.originalEvent;
                self.onDrawMove(touchEvent.touches[0].pageX - offsetLeft, touchEvent.touches[0].pageY - offsetTop);
            });
            jCanvas.on("touchend", () => {
                self.onDrawEnd();
            });

            //WIth mouse
            jCanvas.on("mousedown", (e) => {
                self.onDrawStart(e.pageX - offsetLeft, e.pageY - offsetTop);
            });
            jCanvas.on("mousemove", (e) => {
                self.onDrawMove(e.pageX - offsetLeft, e.pageY - offsetTop);
            });
            jCanvas.on("mouseup", () => {
                self.onDrawEnd();
            });
            jCanvas.on("mouseout", () => {
                self.onDrawEnd();
            });
        }

        this.toolbar && this.toolbar.show();
    }

    public hide() {
        this.toolbar && this.toolbar.hide();
    }

    private onDrawStart(startX: number, startY: number) {
        this.isDown = true;
        this.lastPoint = new CanvasPointEvent(startX, startY, this.brush, this.color, this.brushSize, false);
    }

    private drawCanvas(point: CanvasPointEvent) {
        if (!point.dragging || !this.lastPoint) {
            return;
        }

        // Brush properties
        this.canvasContext.lineWidth = point.size.size;
        this.canvasContext.strokeStyle = point.color;
        this.canvasContext.lineJoin = "round";
        this.canvasContext.lineCap = "round";


        //Tool overwrite
        this.canvasContext.shadowBlur = 0;
        this.canvasContext.globalCompositeOperation = "source-over";
        let dist = Whiteboard.distanceBetween(this.lastPoint, point);
        let angle = Whiteboard.angleBetween(this.lastPoint, point);
        let lineWidth = point.size.size;


        for (let i = 0; i < dist; i += 4) {
            let x = this.lastPoint.x + (Math.sin(angle) * i);
            let y = this.lastPoint.y + (Math.cos(angle) * i);

            let radgrad;
            let rgb = Whiteboard.hexToRgb(point.color);

            // noinspection FallThroughInSwitchStatementJS
            switch (point.brush) {
                case Brush.Paintbrush :
                    radgrad = this.canvasContext.createRadialGradient(x, y, 0.1 * lineWidth, x, y, 0.8 * lineWidth);
                    radgrad.addColorStop(0, 'rgba(' + rgb.red + ',' + rgb.green + ',' + rgb.blue + ',0.2)');
                    radgrad.addColorStop(0.5, 'rgba(' + rgb.red + ',' + rgb.green + ',' + rgb.blue + ',0.05)');
                    radgrad.addColorStop(1, 'rgba(' + rgb.red + ',' + rgb.green + ',' + rgb.blue + ',0)');
                    this.canvasContext.fillStyle = radgrad;
                    this.canvasContext.fillRect(x - lineWidth, y - lineWidth, 2 * lineWidth, 2 * lineWidth);
                    break;
                case Brush.Chalk:
                    // this.canvasContext.globalCompositeOperation = "destination-over";
                    for (let i = 20; i--;) {
                        let offsetX = Whiteboard.getRandomInt(-lineWidth / 1.8, lineWidth / 1.8);
                        let offsetY = Whiteboard.getRandomInt(-lineWidth / 1.8, lineWidth / 1.8);
                        this.canvasContext.fillStyle = "#fff";
                        this.canvasContext.fillRect(point.x + offsetX, point.y + offsetY,
                            Whiteboard.getRandomInt(1, 3),
                            Whiteboard.getRandomInt(1, 3));
                    }

                    radgrad = this.canvasContext.createRadialGradient(x, y, 0.1 * lineWidth, x, y, 0.7 * lineWidth);
                    radgrad.addColorStop(0, 'rgba(' + rgb.red + ',' + rgb.green + ',' + rgb.blue + ',0.2)');
                    radgrad.addColorStop(0.85, 'rgba(' + rgb.red + ',' + rgb.green + ',' + rgb.blue + ',0.18)');
                    radgrad.addColorStop(1, 'rgba(' + rgb.red + ',' + rgb.green + ',' + rgb.blue + ',0)');
                    this.canvasContext.fillStyle = radgrad;
                    this.canvasContext.fillRect(x - lineWidth, y - lineWidth, 2 * lineWidth, 2 * lineWidth);
                    break;

                case Brush.Eraser :
                    this.canvasContext.globalCompositeOperation = "destination-out";
                    lineWidth = BrushSize.XLarge.size;
                default:
                    radgrad = this.canvasContext.createRadialGradient(x, y, 0, x, y, 0.5 * lineWidth);
                    radgrad.addColorStop(0, 'rgba(' + rgb.red + ',' + rgb.green + ',' + rgb.blue + ',1)');
                    radgrad.addColorStop(0.85, 'rgba(' + rgb.red + ',' + rgb.green + ',' + rgb.blue + ',0.9)');
                    radgrad.addColorStop(1, 'rgba(' + rgb.red + ',' + rgb.green + ',' + rgb.blue + ',0)');
                    this.canvasContext.fillStyle = radgrad;
                    this.canvasContext.fillRect(x - lineWidth, y - lineWidth, 2 * lineWidth, 2 * lineWidth);
            }
        }
        this.lastPoint = point;

        // TODO tlu : support other brushes...
        // http://fabricjs.com/freedrawing
        // http://perfectionkills.com/exploring-canvas-drawing-techniques/
    }

    private static getRandomInt(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    private onDrawMove(moveX: number, moveY: number) {
        if (this.isDown) {
            let currentPoint = new CanvasPointEvent(moveX, moveY, this.brush, this.color, this.brushSize, true);
            this.drawCanvas(currentPoint);
        }
    }

    private onDrawEnd() {
        this.isDown = false;
        this.lastPoint = null;
    }


    private static distanceBetween(previousPoint: CanvasPointEvent, point: CanvasPointEvent): number {
        return Math.sqrt(Math.pow(point.x - previousPoint.x, 2) + Math.pow(point.y - previousPoint.y, 2));
    }

    private static angleBetween(previousPoint: CanvasPointEvent, point: CanvasPointEvent): number {
        return Math.atan2(point.x - previousPoint.x, point.y - previousPoint.y);
    }

    private static hexToRgb(colorHex: string): RGBColor {
        let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(colorHex);
        return result ? {
            red: parseInt(result[1], 16),
            green: parseInt(result[2], 16),
            blue: parseInt(result[3], 16)
        } : null;
    }

    changeColor(newColor: string) {
        this.color = newColor;
    }

    changeBrush(newBrush: string) {
        this.brush = Whiteboard.getBrushFrom(newBrush);
    }

    getBrush(): Brush {
        return this.brush;
    }

    getBrushName(): string {
        switch (this.brush) {
            case Brush.Chalk:
                return "chalk";
            case Brush.Paintbrush:
                return "paintbrush";
            case Brush.Eraser:
                return "eraser";
            default:
                return "pencil";
        }
    }

    // TODO tlu : move into a separate class
    private static getBrushFrom(newBrush: string): Brush {
        switch (newBrush) {
            case "chalk":
                return Brush.Chalk;
            case "paintbrush":
                return Brush.Paintbrush;
            case "eraser":
                return Brush.Eraser;
            default:
                return Brush.Pencil;
        }
    }

    getColor(): string {
        return this.color;
    }

    getBrushSize(): BrushSize {
        return this.brushSize;
    }

    setBrushSize(brushSize: BrushSize) {
        this.brushSize = brushSize;
        this.canvasContext.lineWidth = this.brushSize.size;
    }

    saveToBlob(cb: (drawingSaved: Blob) => void) {
        this.canvas.toBlob((blob) => {
            cb(blob);
        });
    }
}

class CanvasPointEvent {
    constructor(public x: number,
                public y: number,
                public brush: Brush,
                public color: string,
                public size: BrushSize,
                public dragging: boolean) {
    }
}

interface RGBColor {
    red: number,
    green: number,
    blue: number
}

export enum Brush {
    Pencil, Chalk, Paintbrush, Eraser
}

const BASE_LINE_WIDTH = 15;

export class BrushSize {
    public static Small = new BrushSize("0.5x", BASE_LINE_WIDTH / 2);
    public static Medium = new BrushSize("1x", BASE_LINE_WIDTH);
    public static Large = new BrushSize("2.5x", 2.5 * BASE_LINE_WIDTH);
    public static XLarge = new BrushSize("4x", 4 * BASE_LINE_WIDTH);

    private constructor(public label: string, public size: number) {
    }
}
