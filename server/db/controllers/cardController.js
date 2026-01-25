import { Card } from "../models/models.js";
import { v4 as uuidv4 } from "uuid";
import { staticPath } from "../../conf.js";
import path from "path";
import fs from "fs";
import ApiError from "../../error/ApiError.js";
import {
  createPlitkaCard,
  createSpheresCard,
  createPorebrikCard,
  createBorduresCard,
  createFbsCard,
  createRoundesCard,
} from "../createExamples.js";

class CardController {
  async create(req, res, next) {
    try {
      const { title, price, description, types, sizes, colors } =
        req.body || {};
      if (!title || !price || !description) {
        return next(ApiError.badRequest("Missing fields"));
      }

      const { img } = req.files;
      if (!img) {
        return next(ApiError.badRequest("Image file is required"));
      }

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

  async createExamples(req, res, next) {
    try {
      await Promise.all([
        Card.create(createPlitkaCard()),
        Card.create(createFbsCard()),
        Card.create(createBorduresCard()),
        Card.create(createRoundesCard()),
        Card.create(createSpheresCard()),
        Card.create(createPorebrikCard()),
      ]);

      const cards = await Card.findAll();
      return res.json({ status: "success", cards });
    } catch (e) {
      console.error(e);
      next(ApiError.badRequest(e.message));
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;

      const card = await Card.findByPk(id);
      if (!card) {
        return next(ApiError.badRequest("Card not found"));
      }

      const { img, title, price, description, types, sizes, colors } = req.body;
      if (img !== undefined) card.img = img;
      if (title !== undefined) card.title = title.trim();
      if (price !== undefined) card.price = price;
      if (description !== undefined) card.description = description.trim();
      if (types !== undefined) card.types = types;
      if (sizes !== undefined) card.sizes = sizes;
      if (colors !== undefined) card.colors = colors;

      await card.save();
      return res.json({ status: "success" });
    } catch (e) {
      console.error(e.message);
      return next(ApiError.internal(e.message));
    }
  }

  async getAll(req, res, next) {
    try {
      const cards = await Card.findAll();
      return res.json(cards);
    } catch (e) {
      console.error(e.message);
      return next(ApiError.internal(e.message));
    }
  }

  async getOne(req, res, next) {
    try {
      const { id } = req.params;

      const card = await Card.findByPk(id);
      if (!card) {
        return next(ApiError.badRequest("Card not found"));
      }

      return res.json(card);
    } catch (e) {
      console.error(e.message);
      return next(ApiError.internal(e.message));
    }
  }

  async deleteAll(req, res, next) {
    try {
      await Card.destroy({ truncate: true, restartIdentity: true });

      return res.json({ status: "success" });
    } catch (e) {
      console.error(e.message);
      return next(ApiError.internal(e.message));
    }
  }

  async deleteOne(req, res, next) {
    try {
      const { id } = req.params;

      const card = await Card.findByPk(id);
      if (!card) {
        return next(ApiError.badRequest("Card not found"));
      }

      await card.destroy();

      return res.json({ status: "success" });
    } catch (e) {
      console.error(e.message);
      return next(ApiError.internal(e.message));
    }
  }
}

export default new CardController();
