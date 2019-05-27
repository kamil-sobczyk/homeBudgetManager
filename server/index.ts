const store = require("./store");
const mongo = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017";
const mongoose = require("mongoose");
const userSchema = require('./data/models/user')

mongoose.connect(url);

const db = mongoose.connection;
const users = db.collection("users");
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("mongo connected");
});

  const User = mongoose.model("User", userSchema);

  const me = new User({
    id: "102234771401894238200",
    items: [
      {
        name: "Bread",
        info: "Buy in Lidl",
        id: "sdfsdfsadfsdfdsf",
        checked: false
      }
    ],
    selected: [
      {
        name: "Aples",
        info: "3kg",
        id: "ekflkdsdsaljd",
        checked: false
      }
    ],
    costs: [
      {
        chosenItems: ["Potatoes"],
        count: 3,
        date: "24.06.2019, 14:57",
        category: "shopping"
      }
    ]
  });

  users.insertOne(me).then(res => {
    // console.log(res)
    return res;
  });

  module.exports = {User};



const appRouter = app => {
  app
    .route("/store/items")
    .get((req, res) => {
      sortItemsByName(req.headers.id);



User.find({id: req.headers.id}, async (err, resp) => {
// console.log(resp[0]);
await res.status(200).send(store[resp[0]].items);
await console.log(resp[0]);

})


        // object of all the users

 
      // res.status(200).send(store[req.headers.id].items);
      // res.status(200).send(store[req.headers.id].items);
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
