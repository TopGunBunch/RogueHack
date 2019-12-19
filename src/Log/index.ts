export class Log {
    messages: Array<string>;

    constructor() {
        this.messages = [];
    }

    push(message: string) {
        this.messages.push(message);
    }
}