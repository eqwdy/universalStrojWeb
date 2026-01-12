import { Card } from "../models/models.js";
import { v4 as uuidv4 } from "uuid";
import { staticPath } from "../../conf.js";
import path from "path";
import fs from "fs";
import ApiError from "../../error/ApiError.js";

class CardController {
  async create(req, res, next) {
    try {
      const { title, price, description, types, sizes, colors } = req.body;
      const { img } = req.files;
      let filename = uuidv4() + ".jpg";

      if (!fs.existsSync(staticPath)) {
        fs.mkdirSync(staticPath);
      }

      img.mv(path.resolve(staticPath, filename));

      const card = await Card.create({
        img: filename,
        title,
        price,
        description,
        types,
        sizes,
        colors,
      });

      return res.json(card);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAll(req, res) {
    const cards = await Card.findAll();
    return res.json(cards);
  }

  async getOne(req, res) {
    const { id } = req.params;

    const card = await Card.findOne({
      where: { id },
    });

    return res.json(card);
  }
}

export default new CardController();
