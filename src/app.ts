import nanoexpress from "nanoexpress";
import jwt from "./middlewares/authenticate"
import UserController from "./controllers/UserController";
import LoginController from "./controllers/LoginController"
import LogoutController from "./controllers/LogoutController";
import ApiVersionController from "./controllers/ApiVersionController";


/**
 * Criate nanoexpress app
 */
 export const app: nanoexpress.INanoexpressApp = nanoexpress();

/**
 * Enpoints of application
 */

// api version endpoint
app.get("/version", ApiVersionController.getVersion);

// login enpoints
app.post("/login", LoginController.login);
app.post("/logout", LogoutController.logout);

// users endpoints
app.use(jwt);
app.get("/users", UserController.findAll);
app.post("/users", UserController.create);
app.get("/users/:userId", UserController.findOne);
app.put("/users/:userId", UserController.update);
app.del("/users/:userId", UserController.delete);
