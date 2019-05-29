const store = require("./store");
const mongoose = require("mongoose");
const userSchema = require("./data/models/user");

const url = "mongodb://localhost:27017/shop";
const newUserProfile = id => {
  return {
    usr: id,
    items: [],
    selected: [],
    costs: []
  };
};
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
    db.on("close", () => {
      connection.removeAllListeners();
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
          const newUser = new users(newUserProfile(req.headers.id));
          newUser.save(err => {
            if (err) return handleError(err);
          });
          res.status(200).send(newUser.items);
        } else {
          res.status(200).send(sortByName(resp.items));
        }
      });
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
      const users = res.users;
      const { oldItem, newItem } = req.body;

      users.updateOne(
        { "items.name": oldItem.name },
        {
          $set: {
            "items.$.name": newItem.name,
            "items.$.info": newItem.info
          }
        },
        (err, data) => {
          if (err) {
            console.log("error ", err);
            return;
          }
        }
      );
    })
    .delete((req, res) => {
      const users = res.users;

      users
        .updateOne(
          { usr: req.headers.id },
          { $pull: { items: { name: req.body.name } } }
        )
        .exec((err, resp) => {
          if (err) {
            console.log("error ", err);
            return;
          }
        });
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
          const newUser = new users(newUserProfile(req.headers.id));
          newUser.save(err => {
            if (err) return handleError(err);
          });
          res.status(200).send(newUser.selected);
        } else {
          res.status(200).send(sortByCheckedValue(resp.selected));
        }
      });
    })
    .put((req, res) => {
      const users = res.users;
      const { oldItem, newItem } = req.body;

      users.updateOne(
        { "selected.name": oldItem.name },
        {
          $set: {
            "selected.$.name": newItem.name,
            "selected.$.info": newItem.info
          }
        },
        (err, data) => {
          if (err) {
            console.log("error ", err);
            return;
          }
        }
      );
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
    const users = res.users;

    users
      .findOneAndUpdate(
        { usr: req.headers.id },
        { $pull: { items: {} } },
        { useFindAndModify: false }
      )
      .exec((err, resp) => {
        if (err) {
          console.log("error ", err);
          return;
        }
      });

    users
      .findOneAndUpdate(
        { usr: req.headers.id },
        { $push: { items } },
        { useFindAndModify: false }
      )
      .exec((err, resp) => {
        if (err) {
          console.log("error ", err);
          return;
        }
      });

    users
      .findOneAndUpdate(
        { usr: req.headers.id },
        { $pull: { selected: {} } },
        { useFindAndModify: false }
      )
      .exec((err, resp) => {
        if (err) {
          console.log("error ", err);
          return;
        }
      });

    users
      .findOneAndUpdate(
        { usr: req.headers.id },
        { $push: { selected } },
        { useFindAndModify: false }
      )
      .exec((err, resp) => {
        if (err) {
          console.log("error ", err);
          return;
        }
      });
  });
};

module.exports = appRouter;

const sortByName = items => items.sort((a, b) => a.name.localeCompare(b.name));

const sortByCheckedValue = items => {
  let checkedItems = [];
  let uncheckedItems = [];
  items.forEach(item =>
    item.checked ? checkedItems.push(item) : uncheckedItems.push(item)
  );
  return [...checkedItems, ...uncheckedItems];
};
