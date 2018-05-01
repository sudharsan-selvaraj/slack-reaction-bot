import * as bodyParser from "body-parser";
import * as express from "express";
import * as path from "path";
import * as exphbs from "express-handlebars";
import { RouteHandler } from "../routes/index";


/**
 * The server.
 *
 * @class Server
 */
export class Server {

    public app: express.Application;
    /**
     * Bootstrap the application.
     *
     * @class Server
     * @method bootstrap
     * @static
     * @return {ng.auto.IInjectorService} Returns the newly created injector for this app.
     */
    public static bootstrap(): Server {
        return new Server();
    }

    /**
     * Constructor.
     *
     * @class Server
     * @constructor
     */
    constructor() {
        //create expressjs application
        this.app = express();

        //configure application
        this.config();

        //add routes
        this.routes();

        //add api
        this.api();
        
    }

    /**
     * Create REST API routes
     *
     * @class Server
     * @method api
     */
    public api() {
        //empty for now
    }

    /**
     * Configure application
     *
     * @class Server
     * @method config
     */
    public config() {

        this.app.engine('.html', exphbs({extname: '.html'}));

        this.app.use(express.static(path.join(__dirname, "public")));

        //configure pug
        this.app.set("views", path.join(__dirname, "views"));
        this.app.set("view engine", ".html");

        //use query string parser middlware
        this.app.use(bodyParser.urlencoded({
            extended: true
        }));
        //use json form parser middlware
        this.app.use(bodyParser.json());

    }

    /**
     * Create router
     *
     * @class Server
     * @method api
     */
    public routes() {
        let router: express.Router;
        router = express.Router();

        //IndexRoute
        RouteHandler.create(router);

        //use router middleware
        this.app.use(router);
    }

}