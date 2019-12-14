const mongoose = require("mongoose");
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

mongoose
  .connect(
    `mongodb+srv://${process.env.DBUSER}:${process.env.DBPASS}@order-tracking-htgsw.mongodb.net/test?retryWrites=true&w=majority`,
    options
  )
  .then(() => {
    console.log("Database Connection Successful.");
  })
  .catch(e => {
    console.log(e);
    console.log("Database Connection Failed.");
  });
