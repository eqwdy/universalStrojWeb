import ApiError from "../../error/ApiError.js";
import { User } from "../models/models.js";

class UserController {
  async registration(req, res) {
    // const { name, tel, password, role } = req.body;
    // const user = await User.create({
    //   name: name,
    //   tel: tel,
    //   password: password,
    //   role: role,
    // });
    // return res.json(user);
  }

  async login(req, res) {}

  async check(req, res, next) {
    const { id } = req.query;
    if (!id) {
      return next(ApiError.badRequest("Missing or emty ID"));
    }
    return res.json(id);
  }
}

export default new UserController();
