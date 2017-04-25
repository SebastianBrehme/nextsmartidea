
export class Message{

    private _text: string = "";
    private _sender: string = "";

    constructor(text: string, sender: string){
        this.text = text;
        this.sender = sender;
    }

    get text() : string {
        return this._text;
    }
    set text(text : string) {
        this._text = text;
        console.log("mesagge-text set");
    }

    get sender() : string {
        return this._sender;
    }
    set sender(sender: string) {
        this._sender = sender;
        console.log("mesagge-sender set");
    }

}