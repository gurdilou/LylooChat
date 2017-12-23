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
    private lastX : number;
    private lastY : number;

    constructor(containerId: string) {
        this.parent = $(containerId).first();
        this.canvas = <HTMLCanvasElement> this.parent.find(".whiteboard").first().get(0);
        this.toolbar = new WhiteboardToolbar(this, this.parent);
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
            jCanvas.attr("width", this.parent.width() + "px");
            jCanvas.attr("height", this.parent.height() + "px");

            $(window).resize(function () {
                jCanvas.attr("width", self.parent.width() + "px");
                jCanvas.attr("height", self.parent.height() + "px");
                self.canvasContext.fillStyle= "#fff";
                self.canvasContext.fillRect(0,0,self.canvas.width, self.canvas.height);
            });
            this.canvasContext = this.canvas.getContext("2d");
            this.canvasContext.lineWidth = this.brushSize.size;
            this.canvasContext.fillStyle= "#fafafa";
            this.canvasContext.fillRect(0,0,this.canvas.width, this.canvas.height);

            jCanvas.on("touchstart", (e) => {
                let touchEvent = <TouchEvent>e.originalEvent;
                self.onDrawStart(touchEvent.touches[0].pageX - offsetLeft, touchEvent.touches[0].pageY - offsetTop);
            });
            jCanvas.on("touchmove", (e) => {
                // ctx.moveTo(canvasX, canvasY);
                let touchEvent = <TouchEvent>e.originalEvent;
                self.onDrawMove(touchEvent.touches[0].pageX - offsetLeft, touchEvent.touches[0].pageY - offsetTop);
            });
            jCanvas.on("touchup", (e) => {
                self.onDrawEnd();
            });

            //WIth mouse
            jCanvas.on("mousedown", (e) => {
                self.onDrawStart(e.pageX - offsetLeft, e.pageY - offsetTop);
            });
            jCanvas.on("mousemove", (e) => {
                self.onDrawMove(e.pageX - offsetLeft, e.pageY - offsetTop);
            });
            jCanvas.on("mouseup", (e) => {
                self.onDrawEnd();
            });
            jCanvas.on("mouseout", (e) => {
                self.onDrawEnd();
            });
        }

        this.toolbar.show();
    }

    public hide() {
        this.toolbar.hide();
    }

    private onDrawStart(startX: number, startY: number) {
        this.isDown = true;
        this.lastX = startX;
        this.lastY = startY;
        this.canvasContext.beginPath();
        this.canvasContext.moveTo(this.lastX,this.lastY);
    }

    private onDrawMove(moveX: number, moveY: number) {
        if (this.isDown) {
            switch(this.brush) {
                case Brush.Eraser:
                    this.canvasContext.globalCompositeOperation="destination-out";
                    this.canvasContext.arc(this.lastX,this.lastY, BrushSize.Large.size,0,Math.PI*2,false);
                    this.canvasContext.fill();
                    this.canvasContext.stroke();
                    this.canvasContext.closePath();
                    this.canvasContext.beginPath();
                    this.canvasContext.moveTo(this.lastX, this.lastY);
                    break;
                default:
                    this.canvasContext.globalCompositeOperation="source-over";
                    this.canvasContext.lineTo(moveX,moveY);
                    this.canvasContext.strokeStyle = this.color;
                    this.canvasContext.lineWidth = this.brushSize.size;
                    this.canvasContext.stroke();
            }
            this.lastX = moveX;
            this.lastY = moveY;
        }
    }

    private onDrawEnd() {
        this.isDown = false;
        this.canvasContext.closePath();
    }

    changeColor(newColor: string) {
        this.color = newColor;
    }

    changeBrush(newBrush: string) {
        this.brush = this.getBrushFrom(newBrush);
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

    private getBrushFrom(newBrush: string): Brush {
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
}


export enum Brush {
    Pencil, Chalk, Paintbrush, Eraser
}

const BASE_LINE_WIDTH = 5;

export class BrushSize {
    public static Small = new BrushSize("0.5x", BASE_LINE_WIDTH / 2);
    public static Medium = new BrushSize("1x", BASE_LINE_WIDTH);
    public static Large = new BrushSize("2.5x", 2.5 * BASE_LINE_WIDTH);
    public static XLarge = new BrushSize("4x", 4 * BASE_LINE_WIDTH);

    private constructor(public label: string, public size: number) {}
}
