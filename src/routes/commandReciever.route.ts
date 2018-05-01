import {NextFunction, Request, Response} from "express";
import {GifFinder} from "../modules/slackGifSearcher";
import {MessageConstructor} from '../modules/messageConstructor';

export class CommmandReciever {

    public gifFinder:GifFinder;
    public messageConstructor:MessageConstructor;

    constructor() {
        this.gifFinder = new GifFinder();
        this.messageConstructor = new MessageConstructor();
    }

    public processSlackRequest(req:Request, res:Response, next:NextFunction):Response {
        return res.send(this.constructPreviewMessage(1, this.getRequestPayload(req).text || ""));
    }

    public interactiveCommands(req:Request, res:Response, next:NextFunction):Response {
        var payload = this.getRequestPayload(req);
        var actionButton = payload.actions[0];
        if (actionButton.name === "send") {
            return res.send(this.messageConstructor.constructSendMessage(payload.callback_id))
        } else {
            payload.callback_id = parseInt(payload.callback_id);
            if (actionButton.name === "next") {
                return res.send(this.constructPreviewMessage(payload.callback_id + 1, actionButton.value || ""));
            } else {
                return res.send(this.constructPreviewMessage(payload.callback_id - 1, actionButton.value || ""));
            }
        }
    }

    public constructPreviewMessage(page:number, keyWord?:string) {
        return this.messageConstructor.createPreviewMessage(this.gifFinder.getGifs(page, 3, keyWord || ""))
    }

    public getRequestPayload(req:Request) {
        try {
            return JSON.parse(req.body.payload);
        } catch (err) {
            return req.body;
        }
    }
}