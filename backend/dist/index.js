import app from "./app.js";
import { connectToDatabase } from "./db/connection.js";
import dotenv from "dotenv";
dotenv.config();
connectToDatabase().then(() => {
    app.listen(process.env.PORT, () => { console.log("server open and connected to database 🤘"); });
}).catch((err) => console.log(err));
//# sourceMappingURL=index.js.map