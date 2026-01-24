// import { where, Op } from "sequelize";
// import ApiError from "../../error/ApiError.js";
// import { createAdmin } from "../createExamples.js";
// import { User } from "../models/models.js";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";

// function generateJwt(id, tel, role) {
//   return jwt.sign({ id: id, tel, role }, process.env.JWT_SECRET, {
//     expiresIn: "24h",
//   });
// }

// class UserController {
//   async registration(req, res, next) {
//     try {
//       const { name, tel, password, role } = req.body || {};
//       if (!name || name.length < 1) {
//         return next(ApiError.badRequest("Missing or uncorrect name"));
//       }
//       if (!tel || !String(tel) || tel.length < 10) {
//         return next(ApiError.badRequest("Missing or uncorrect telephone"));
//       }
//       if (!password || !String(password) || password.length < 4) {
//         return next(ApiError.badRequest("Missing or uncorrect password"));
//       }

//       const telStr = String(tel);

//       const candidate = await User.findOne({ where: { tel: telStr } });
//       if (candidate) {
//         return next(ApiError.badRequest("This telephone is already in use"));
//       }

//       const hidePassword = await bcrypt.hash(String(password), 5);

//       const user = await User.create({
//         name,
//         tel: telStr,
//         password: hidePassword,
//       });

//       const token = generateJwt(user.id, user.tel, user.role);

//       return res.json({ token: token });
//     } catch (e) {
//       console.error(e.message);
//       return next(ApiError.internal(e.message));
//     }
//   }

//   async registrationPrimaryAdmin(req, res, next) {
//     try {
//       let user = createAdmin();
//       user.password = await bcrypt.hash(String(user.password), 5);

//       const candidate = await User.findOne({ where: { tel: user.tel } });
//       if (candidate) {
//         return next(ApiError.badRequest("This telephone is already in use"));
//       }

//       user.role = "ADMIN";
//       await User.create(user);

//       const token = generateJwt(user.id, user.tel, user.role);

//       return res.json({ token: token });
//     } catch (e) {
//       console.error(e.message);
//       return next(ApiError.internal(e.message));
//     }
//   }

//   async registrationAdmin(req, res, next) {
//     try {
//       const { name, tel, password } = req.body || {};
//       if (!name || name.length < 1) {
//         return next(ApiError.badRequest("Missing or uncorrect name"));
//       }
//       if (!tel || !String(tel) || tel.length < 10) {
//         return next(ApiError.badRequest("Missing or uncorrect telephone"));
//       }
//       if (!password || !String(password) || password.length < 4) {
//         return next(ApiError.badRequest("Missing or uncorrect password"));
//       }

//       const telStr = String(tel);

//       const candidate = await User.findOne({ where: { tel: telStr } });
//       if (candidate) {
//         return next(ApiError.badRequest("This telephone is already in use"));
//       }

//       const hidePassword = await bcrypt.hash(String(password), 5);

//       const user = await User.create({
//         name,
//         tel: telStr,
//         password: hidePassword,
//         role: "ADMIN",
//       });

//       const token = generateJwt(user.id, user.tel, user.role);

//       return res.json({ token: token });
//     } catch (e) {
//       console.error(e.message);
//       return next(ApiError.internal(e.message));
//     }
//   }

//   async login(req, res, next) {
//     try {
//       const { tel, password } = req.body || {};

//       const user = await User.findOne({
//         where: { tel },
//       });

//       if (!user) {
//         return next(ApiError.badRequest("User wasnt found"));
//       }

//       let comparePassword = bcrypt.compareSync(password, user.password);
//       if (!comparePassword) {
//         return next(ApiError.badRequest("Uncorrect password"));
//       }

//       const token = generateJwt(user.id, user.tel, user.role);

//       //   res.cookie("token", token, {
//       //     httpOnly: true, // недоступен из JS
//       //     // secure: true, // только HTTPS
//       //     sameSite: "strict", // защита от CSRF
//       //     maxAge: 24 * 60 * 60 * 1000,
//       //   });

//       //   res.json({ message: "Login successful" });
//       return res.json({ token: token });
//     } catch (e) {
//       console.error(e.message);
//       return next(ApiError.internal(e.message));
//     }
//   }

//   async check(req, res, next) {
//     const token = generateJwt(req.user.id, req.user.email, req.user.role);
//     return res.json({ token: token });
//   }

//   async checkIsAdmin(req, res, next) {
//     const token = generateJwt(req.user.id, req.user.email, req.user.role);
//     return res.json({ token: token });
//   }

//   async getAll(req, res, next) {
//     try {
//       const users = await User.findAll();
//       return res.json(users);
//     } catch (e) {
//       console.error(e.message);
//       return next(ApiError.internal(e.message));
//     }
//   }
//   async getAllAdmins(req, res, next) {
//     try {
//       const admins = await User.findAll({
//         where: { role: "ADMIN" },
//         where: { role: "ADMIN", tel: { [Op.ne]: req.user.id } },
//       });
//       console.log(`admins`);
//       admins.forEach((user) => {});
//       return res.json(admins);
//     } catch (e) {
//       console.error(e.message);
//       return next(ApiError.internal(e.message));
//     }
//   }

//   async delete(req, res, next) {
//     try {
//       const { id } = req.params;

//       const user = await User.findByPk(id);
//       if (user.role === "ADMIN") {
//         return next(ApiError.badRequest("User is Admin"));
//       }
//       if (!user) {
//         return next(ApiError.badRequest("User not found"));
//       }

//       await user.destroy();

//       return res.json({ status: "success" });
//     } catch (e) {
//       console.error(e.message);
//       return next(ApiError.internal(e.message));
//     }
//   }

//   async deleteAdmin(req, res, next) {
//     try {
//       const { id } = req.params;

//       const user = await User.findByPk(id);
//       if (user.role !== "ADMIN") {
//         return next(ApiError.badRequest("User isn't Admin"));
//       }
//       if (!user) {
//         return next(ApiError.badRequest("User not found"));
//       }

//       await user.destroy();

//       return res.json({ status: "success" });
//     } catch (e) {
//       console.error(e.message);
//       return next(ApiError.internal(e.message));
//     }
//   }
// }

import { where, Op } from "sequelize";
import ApiError from "../../error/ApiError.js";
import { createAdmin } from "../createExamples.js";
import { User } from "../models/models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

function generateJwt(id, tel, role) {
  return jwt.sign({ id: id, tel, role }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
}

class UserController {
  async registration(req, res, next) {
    try {
      const { name, tel, password, role } = req.body || {};
      if (!name || name.length < 1) {
        return next(ApiError.badRequest("Missing or uncorrect name"));
      }
      if (!tel || !String(tel) || tel.length < 10) {
        return next(ApiError.badRequest("Missing or uncorrect telephone"));
      }
      if (!password || !String(password) || password.length < 4) {
        return next(ApiError.badRequest("Missing or uncorrect password"));
      }

      const telStr = String(tel);

      const candidate = await User.findOne({ where: { tel: telStr } });
      if (candidate) {
        return next(ApiError.badRequest("This telephone is already in use"));
      }

      const hidePassword = await bcrypt.hash(String(password), 5);

      const user = await User.create({
        name,
        tel: telStr,
        password: hidePassword,
      });

      const token = generateJwt(user.id, user.tel, user.role);

      return res.json({ token: token });
    } catch (e) {
      console.error(e.message);
      return next(ApiError.internal(e.message));
    }
  }
  async registrationPrimaryAdmin(req, res, next) {
    try {
      let user = createAdmin();
      user.password = await bcrypt.hash(String(user.password), 5);

      const candidate = await User.findOne({ where: { tel: user.tel } });
      if (candidate) {
        return next(ApiError.badRequest("This telephone is already in use"));
      }

      user.role = "ADMIN";
      await User.create(user);

      return res.json({ status: "success" });
    } catch (e) {
      console.error(e.message);
      return next(ApiError.internal(e.message));
    }
  }
  async registrationAdmin(req, res, next) {
    try {
      const { name, tel, password } = req.body || {};
      if (!name || name.length < 1) {
        return next(ApiError.badRequest("Missing or uncorrect name"));
      }
      if (!tel || !String(tel) || tel.length < 10) {
        return next(ApiError.badRequest("Missing or uncorrect telephone"));
      }
      if (!password || !String(password) || password.length < 4) {
        return next(ApiError.badRequest("Missing or uncorrect password"));
      }

      const telStr = String(tel);

      const candidate = await User.findOne({ where: { tel: telStr } });
      if (candidate) {
        return next(ApiError.badRequest("This telephone is already in use"));
      }

      const hidePassword = await bcrypt.hash(String(password), 5);

      await User.create({
        name,
        tel: telStr,
        password: hidePassword,
        role: "ADMIN",
      });

      return res.json({ status: "success" });
    } catch (e) {
      console.error(e.message);
      return next(ApiError.internal(e.message));
    }
  }

  async login(req, res, next) {
    try {
      const { tel, password } = req.body || {};

      const user = await User.findOne({
        where: { tel },
      });

      if (!user) {
        return next(ApiError.badRequest("User wasnt found"));
      }

      let comparePassword = bcrypt.compareSync(password, user.password);
      if (!comparePassword) {
        return next(ApiError.badRequest("Uncorrect password"));
      }

      const token = generateJwt(user.id, user.tel, user.role);

      return res.json({ token: token });
    } catch (e) {
      console.error(e.message);
      return next(ApiError.internal(e.message));
    }
  }

  async check(req, res, next) {
    const token = generateJwt(req.user.id, req.user.email, req.user.role);
    return res.json({ token: token });
  }

  async getAll(req, res, next) {
    try {
      const users = await User.findAll();
      return res.json(users);
    } catch (e) {
      console.error(e.message);
      return next(ApiError.internal(e.message));
    }
  }
  async getAllAdmins(req, res, next) {
    try {
      const admins = await User.findAll({
        where: { role: "ADMIN", id: { [Op.ne]: req.user.id } },
      });
      return res.json(admins);
    } catch (e) {
      console.error(e.message);
      return next(ApiError.internal(e.message));
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;

      const user = await User.findByPk(id);
      if (user.role === "ADMIN") {
        return next(ApiError.badRequest("User is Admin"));
      }
      if (!user) {
        return next(ApiError.badRequest("User not found"));
      }

      await user.destroy();

      return res.json({ status: "success" });
    } catch (e) {
      console.error(e.message);
      return next(ApiError.internal(e.message));
    }
  }

  async deleteAdmin(req, res, next) {
    try {
      const { id } = req.params;

      const user = await User.findByPk(id);

      if (!user) {
        return next(ApiError.badRequest("User not found"));
      }

      if (user.role !== "ADMIN") {
        return next(ApiError.badRequest("User isn't Admin"));
      }

      await user.destroy();

      return res.json({ status: "success" });
    } catch (e) {
      console.error(e.message);
      return next(ApiError.internal(e.message));
    }
  }

  async getUser(req, res, next) {
    try {
      const id = req.user.id;
      const user = await User.findByPk(id);
      if (!user) {
        return next(ApiError.badRequest("User not found"));
      }

      return res.json(user);
    } catch (e) {
      console.error(e.message);
      return next(ApiError.internal(e.message));
    }
  }
}

export default new UserController();

// export default new UserController();
