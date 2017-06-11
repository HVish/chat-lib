'use strict';

/**
 * Enumeration for message class
 * @type {Object}
 */
const MESSAGE = {
    STATUS: {
        NONE: 0,
        SENT: 1,
        UNREAD: 2,
        READ: 3
    },
    POSITION: {
        LEFT: true,
        RIGHT: false
    }
};

/**
 * Exception class for invalid parameter
 * @param {string} param   name of parameter
 * @param {string} message error message
 */
class InvalidParameter extends Error {
    constructor(param, message) {
        super(`Invalid parameter "${param}": ${message}`);
    }
};

class Message {
    /**
     * @param  {string}   msg       text string message
     * @param  {date}     date      date and time when message sent
     * @param  {Boolean}  isLeft    show message left or right, default: false
     * @param  {enum}     status    ["none", "sent", "unread", "read"], default: none
     * @param  {string}   id        id to uniquely determine a message, optional
     * @return {Message}            a message object
     */
    constructor(msg, date, isLeft, status, id) {

        this.id = id;

        if (msg && typeof msg == `string`) {
            this.msg = msg
        } else {
            throw new InvalidParameter(`msg`, `It should be a non-empty string`);
        }

        if (date instanceof Date) {
            this.date = date;
            let time = date.toLocaleTimeString(`en-US`, {
                hour12: true,
                hour: `numeric`,
                minute: `numeric`
            });
            this.meta = `<span>${time}</span>`;
        } else {
            throw (new InvalidParameter(`date`, `It should of date type`));
        }

        switch (isLeft) {
            case MESSAGE.POSITION.LEFT:
                this.isLeft = isLeft;
                this.msgClass = `message-wrapper left`;
                break;
            case MESSAGE.POSITION.RIGHT:
            default:
                this.isLeft = isLeft;
                this.msgClass = `message-wrapper right`;
        }

        switch (status) {
            case MESSAGE.STATUS.NONE:
                this.status = status;
                break;
            case MESSAGE.STATUS.SENT:
                this.status = status;
                this.meta += `<span><i class="material-icons">done</i></span>`;
                break;
            case MESSAGE.STATUS.UNREAD:
                this.status = status;
                this.meta += `<span><i class="material-icons">done_all</i></span>`;
                break;
            case MESSAGE.STATUS.READ:
                this.status = status;
                this.meta += `<span class="message-read"><i class="material-icons">done_all</i></span>`;
                break;
            default:
                this.status = MESSAGE.STATUS.NONE;
        }
    }

    get html() {

        let message = `<div class="message">${this.msg}</div>`;
        let metaData = `<div class="meta">${this.meta}</div>`;
        let dom = document.createElement('div');

        dom.className = this.msgClass;
        dom.innerHTML = message + metaData;
        this.dom = dom;

        return dom;
    }

    toString() {
        return this.msg;
    }

};
class ChatBox {
    /**
     * @param  {string}  id        unique identifier for chatbox
     * @param  {string}  title     title to show on title bar of chatbox
     * @param  {Array}   messages  list of messages to add, optional
     * @param  {Boolean} isEnabled message input enabled or not, default true
     * @return {ChatBox}           a chatbox object
     */
    constructor(id, title, messages, isEnabled) {

        this.isEnabled = (isEnabled == true) ? true : false;

        if (id) {
            this.id = id;
        } else {
            throw new InvalidParameter(`id`, `required parameter`);
        }

        if (title) {
            this.title = title;
        } else {
            throw new InvalidParameter(`title`, `required parameter`);
        }

        if (messages && messages instanceof Array) {
            for (let message of messages) {
                this.appendMsg(message);
            }
        } else if (messages) {
            throw new InvalidParameter(`messages`, `It should be an Array`);
        }

        this.createDom();
    }

    createDom() {

        let dom = document.createElement(`div`);
        dom.className = `chat-box`;
        this.dom = dom;

        this.createTitleBar();
    }

    createTitleBar() {

        let dom = document.createElement('div');
        let title = `<span class="chat-title">${this.title}</span>`;
        let close = `<span class="chat-close"><i class="material-icons">close</i></span>`;

        dom.className = `title-wrapper`;
        dom.innerHTML = title + close;
        this.dom.appendChild(dom);

        this.createChatBody();
    }

    createChatBody() {

        let dom = document.createElement('div');

        dom.className = `chat-body-wrapper`;
        this.dom.appendChild(dom);

        this.createChatFooter();
    }

    createChatFooter() {

        if (this.isEnabled === true) {
            let dom = document.createElement('div');
            let editable = `contenteditable="true" placeholder="Type a message..."`;
            let input = `<div class="chat-input" ${editable}></div>`;
            let send = `<div class="chat-send"><i class="material-icons">send</i></div>`;

            dom.className = `chat-footer-wrapper`;
            dom.innerHTML = input + send;
            this.dom.appendChild(dom);
        }

    }

    appendMsg(message) {
        if (message instanceof Message) {
            // append message logic
            console.log(message.html);
        } else {
            throw new InvalidParameter(`messages[i]`, `It should be of type Message`);
        }
    }

    get html() {
        return this.dom;
    }
}