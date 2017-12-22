import {WhiteboardToolbar} from "./whiteboardToolbar";

/**
 * A white paperboard on which user can draw
 */
export class Whiteboard {
    private color = "#572c56";
    private brush: Brush = Brush.Pencil;

    private canvas: HTMLCanvasElement = null;
    private parent: JQuery = null;
    private isDown = false;
    private canvasContext: CanvasRenderingContext2D = null;
    private toolbar: WhiteboardToolbar;

    constructor(containerId: string) {
        this.parent = $(containerId).first();
        this.canvas = <HTMLCanvasElement> this.parent.find(".whiteboard").first().get(0);
        this.toolbar = new WhiteboardToolbar(this, this.parent);
    }

    /**
     * Element must have is final position and parent when this method is called.
     * => It implies that animations are complete, add dom rendered
     */
    public initialize(): void {
        let self = this;
        if (this.canvas) {
            this.isDown = false;
            let jCanvas = $(this.canvas);
            jCanvas.attr("width", (this.parent.width() - this.parent.offset().left) + "px");
            jCanvas.attr("height", (this.parent.height() - this.parent.offset().top) + "px");

            $(window).resize(function () {
                jCanvas.attr("width", (self.parent.width() - self.parent.offset().left) + "px");
                jCanvas.attr("height", (self.parent.height() - self.parent.offset().top) + "px");
            });
            this.canvasContext = this.canvas.getContext("2d");
            this.canvasContext.lineWidth = 5;

            jCanvas.on("touchstart", (e) => {
                let touchEvent = <TouchEvent>e.originalEvent;
                self.onDrawStart(touchEvent.touches[0].pageX, touchEvent.touches[0].pageY);
            });
            jCanvas.on("touchmove", (e) => {
                // ctx.moveTo(canvasX, canvasY);
                let touchEvent = <TouchEvent>e.originalEvent;
                self.onDrawMove(touchEvent.touches[0].pageX, touchEvent.touches[0].pageY);
            });
            jCanvas.on("touchup", (e) => {
                self.onDrawEnd();
            });

            //WIth mouse
            jCanvas.on("mousedown", (e) => {
                let mouseEvent = <MouseEvent>e.originalEvent;
                self.onDrawStart(mouseEvent.offsetX, mouseEvent.offsetY);
            });
            jCanvas.on("mousemove", (e) => {
                // ctx.moveTo(canvasX, canvasY);
                let mouseEvent = <MouseEvent>e.originalEvent;
                self.onDrawMove(mouseEvent.offsetX, mouseEvent.offsetY);
            });
            jCanvas.on("mouseup", (e) => {
                self.onDrawEnd();
            });
        }

        this.toolbar.initialize();
    }

    private onDrawStart(startX: number, startY: number) {
        this.isDown = true;
        this.canvasContext.beginPath();

        let canvasX = startX - this.parent.offset().left;
        let canvasY = startY - this.parent.offset().top;
        this.canvasContext.moveTo(canvasX, canvasY);
    }

    private onDrawMove(moveX: number, moveY: number) {
        if (this.isDown) {
            let canvasX = moveX - this.parent.offset().left;
            let canvasY = moveY - this.parent.offset().top;

            this.canvasContext.lineTo(canvasX, canvasY);
            this.canvasContext.strokeStyle = this.color;
            this.canvasContext.stroke();
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

    getBrush(): string {
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
}


export enum Brush {
    Pencil, Chalk, Paintbrush, Eraser
}
