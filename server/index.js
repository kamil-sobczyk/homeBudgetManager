const store = require("./store");
const mongoose = require("mongoose");
const userSchema = require("./data/models/user");

const url = "mongodb://localhost:27017/shop";

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
        if (!resp) {
          const me = new users({
            usr: req.headers.id,
            items: [],
            selected: [],
            costs: []
          });
          me.save(err => {
            if (err) return handleError(err);
          });
        }

        console.log("items", resp.items);

        res.status(200).send(sortItems(resp.items));
      });

      // sortItemsByName(req.headers.id);
    })
    .post((req, res) => {
      const users = res.users;

      users
        .findOneAndUpdate(
          { usr: req.headers.id },
          { $push: { items: req.body.item } },
          { useFindAndModify: false }
        )
        .exec((err, resp) => {
          if (err) {
            console.log("error ", err);
            return;
          }
        });
    })
    .put((req, res) => {
      const { index, newItem } = req.body;

      store[req.headers.id].items[index] = newItem;
      res.status(200).json(store[req.headers.id].items);
    })
    .delete((req, res) => {
      store[req.headers.id].items.splice(req.body.index, 1);
      const users = res.users;
      // users.findOneAndRemove({ usr: req.headers.id }).exec((err, resp) => {
      //   if (err) {
      //     console.log("error ", err);
      //     return;
      //   }
      //   res.status(200);
      // });

      res.status(200).json(store[req.headers.id].items);
    });

  app
    .route("/store/selected")
    .get((req, res) => {
      const users = res.users;

      users.findOne({ usr: req.headers.id }).exec((err, resp) => {
        if (err) {
          console.log("error ", err);
          return;
        }
        if (!resp) {
          const me = new users({
            usr: req.headers.id,
            items: [],
            selected: [],
            costs: []
          });
          me.save(err => {
            if (err) return handleError(err);
          });
        }

        console.log("selected", resp.selected);

        res.status(200).send(resp.selected);
      });

      sortSelectedByCheckedValue(req.headers.id);
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
      const users = res.users;

      users.findOne({ usr: req.headers.id }).exec((err, resp) => {
        if (err) {
          console.log("error ", err);
          res.status(500);
          return;
        }
        res.status(200).send(resp.costs);
      });
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

const sortItems = items => items.sort((a, b) => a.name.localeCompare(b.name));

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
