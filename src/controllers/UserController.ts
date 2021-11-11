import { IHttpRequest, IHttpResponse, HttpRequestBody, HttpRequestParams } from "nanoexpress"
import { Model } from "sequelize/types";
import LOGGER from "../lib/logger";
import { UserModel } from "../models/UserModel";

class UserController {
  
  /**
   * This method is responsible for return all users
   * @param req The request received
   * @param res The response gived
   * @returns Status code and users
   */
  async findAll(req: IHttpRequest, res: IHttpResponse) {
    const user: Model<any, any>[] = await UserModel.findAll();
    LOGGER.http("[GET] request on endpoint /users");
    return res.status(200).json(user);
  }

  /**
   * This method is responsible for return the user by id
   * @param req The request received
   * @param res The response gived
   * @returns Status code and user
   */
  async findOne(req: IHttpRequest, res: IHttpResponse) {
    const {userId}: any = req.params;
    const user = await UserModel.findOne(
      {where: { id: userId}}
    );
    LOGGER.http("[GET] request on endpoint /users");
    return user ? res.status(200).json(user): res.status(400);
  }

  /**
   * This method is responsible for create users
   * @param req The request received
   * @param res The response gived
   * @returns Status code and user created
   */
  async create(req: IHttpRequest, res: IHttpResponse) {
    const reqBody: any = req.body;
    const {name, email, password}: any = JSON.parse(reqBody.toString());
    const user: Model<any, any> = await UserModel.create({
      name,
      email,
      password
    });
    LOGGER.http("[POST] request on endpoint /users");
    return res.status(201).json(user);
  }

  /**
   * This method is responsible for update the users
   * @param req The request received
   * @param res The response gived
   * @returns Status code and message
   */
  async update(req: IHttpRequest, res: IHttpResponse) {
    const {userId}: any = req.params;
    const reqBody: any = req.body
    const {user}: any = await UserModel.update(JSON.parse(reqBody.toString()),
     {where: {id: userId}}
    );
    LOGGER.http("[PUT] request on endpoint /users");
    return res.status(200).json(
      {"message": "user updated successfully"}
    );
  }
  
  /**
   * This method is responsible for delete users
   * @param req The request received
   * @param res The response gived
   * @returns Status code and message
   */
  async delete(req: IHttpRequest, res: IHttpResponse) {
    const {userId}: any = req.params;
    await UserModel.destroy({where: {id: userId}});
    LOGGER.http("[DELETE] request on endpoint /users");
    return res.status(200).json({"mesage": "user deleted with success"});
  }
}

export default new UserController();