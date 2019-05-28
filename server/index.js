const store = require("./store");
const mongo = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017/shop";
const mongoose = require("mongoose");
const userSchema = require("./data/models/user");

/**/

//module.exports = {User};

const appRouter = app => {
  app.all("/*", (req, res, next) => {
    mongoose.connect(url, { useNewUrlParser: true });
    const db = mongoose.connection;
    const UserModel = mongoose.model("users", userSchema);
    db.on("error", console.error.bind(console, "connection error:"));
    db.once("open", () => {
      res.users = UserModel;
      next();
    });
  });

  app
    .route("/store/items")
    .get((req, res) => {
      const users = res.users;

      users.findOne({ usr: req.headers.id }).exec((err, resp) => {
        if (err) {
          console.log("error ", err);
          return;
        }
        res.status(200).send(resp.items);
      });

      sortItemsByName(req.headers.id);
    })
    .post((req, res) => {
      store[req.headers.id].items.push(req.body.item);

      sortItemsByName(req.headers.id);
      res.status(200).send(store[req.headers.id].items);
    })
    .put((req, res) => {
      const { index, newItem } = req.body;

      store[req.headers.id].items[index] = newItem;
      res.status(200).json(store[req.headers.id].items);
    })
    .delete((req, res) => {
      store[req.headers.id].items.splice(req.body.index, 1);
      res.status(200).json(store[req.headers.id].items);
    });

  app
    .route("/store/selected")
    .get((req, res) => {
      sortSelectedByCheckedValue(req.headers.id);
      res.status(200).json(store[req.headers.id].selected);
    })
    .put((req, res) => {
      const { index, newItem } = req.body;

      store[req.headers.id].selected[index] = newItem;
      res.status(200).json(store[req.headers.id].selected);
    });

  app.put("/store/checked", (req, res) => {
    const { index } = req.body;
    if (store[req.headers.id].selected[index]) {
      store[req.headers.id].selected[index].checked = !store[req.headers.id]
        .selected[index].checked;
    }
  });

  app
    .route("/store/costs")
    .get((req, res) => {
      res.status(200).json(store[req.headers.id].costs);
    })
    .post((req, res) => {
      store[req.headers.id].costs.unshift(req.body.cost);
      res.status(200).json(store[req.headers.id].costs);
    });

  app.put("/store", (req, res) => {
    const { items, selected } = req.body;

    if (items !== store[req.headers.id].items)
      store[req.headers.id].items = items;
    if (selected !== store[req.headers.id].selected)
      store[req.headers.id].selected = selected;
    res.status(200).json(store[req.headers.id]);
  });
};

module.exports = appRouter;

const sortItemsByName = id =>
  store[id].items.sort((a, b) => a.name.localeCompare(b.name));

const sortSelectedByCheckedValue = id => {
  let checkedItems = [];
  let uncheckedItems = [];
  store[id].selected.forEach(item =>
    item.checked ? checkedItems.push(item) : uncheckedItems.push(item)
  );
  store[id].selected = [...checkedItems, ...uncheckedItems];
};
