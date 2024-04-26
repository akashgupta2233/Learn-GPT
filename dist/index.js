import app from "./app.js";
import { connectToMongoDB } from "./connections/mongodbConnection.js";
connectToMongoDB()
    .then(() => {
    app.listen(process.env.PORT, () => {
        console.log("Server Open and Connected To Database🤟🤟");
    });
}).catch(err => console.error(err));
//# sourceMappingURL=index.js.map