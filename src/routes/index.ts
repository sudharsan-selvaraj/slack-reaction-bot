import { NextFunction, Request, Response, Router } from "express";
import {CommmandReciever} from './commandReciever.route';

/**
 * / route
 *
 * @class User
 */
export class RouteHandler {

    /**
     * Create the routes.
     *
     * @class IndexRoute
     * @method create
     * @static
     */
    public static create(router: Router) {
        router.get("/", (req: Request, res: Response, next: NextFunction) => {
            res.json({'status':"success"});
        });
        
        router.post("/getGif", (req: Request, res: Response, next: NextFunction) => {
            new CommmandReciever().processSlackRequest(req, res, next);
        });

        router.post("/processAction", (req: Request, res: Response, next: NextFunction) => {
            new CommmandReciever().interactiveCommands(req, res, next);
        });
    }

}