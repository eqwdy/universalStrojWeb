import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const staticPath = path.resolve(__dirname, "static");

export { staticPath, __dirname };
