const store = require("./store");
const mongo = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017";
const mongoose = require("mongoose");

mongoose
  .connect(url, (err, db) => {
    if (err) {
      console.log('Err', err)
    } else {
      console.log("MongoDB connected…");
      const collection = db.collection('users')
      
    }
  })
  .catch(err => console.log(err));

// mongo.connect(url, (err, client) => {
//   if (err) {
//     console.error(err)
//     return
//   } else {
//     const db = client.db('users')
//     const collection = db.collection('102234771401894238200')
//     collection.insertOne({
//       items: [
//         {
//           name: "Bread",
//           info: "Buy in Lidl",
//           id: "sdfsdfsadfsdfdsf",
//           checked: false
//         },
//         {
//           name: "Cola",
//           info: "",
//           id: "gfvfsddwed",
//           checked: false
//         },
//         {
//           name: "Milk",
//           info: "Buy in Tesco",
//           id: "324rijdsojfddsaoid",
//           checked: false
//         },
//         {
//           name: "Beer",
//           info: "",
//           id: "fdswefi343fdsdf",
//           checked: false
//         },
//         {
//           name: "Bananas",
//           info: "10pcs",
//           id: "fdswefi3ddddddddddd",
//           checked: false
//         }
//       ],
//       selected: [
//         {
//           name: "Ham",
//           info: "In slices",
//           id: "43rpijdskjfna",
//           checked: false
//         },
//         {
//           name: "Rice",
//           info: "",
//           id: "e3rijfisdnc.kas3",
//           checked: false
//         },
//         {
//           name: "Potatoes",
//           info: "Buy in Tesco",
//           id: "43ifpjsdljnfew33",
//           checked: false
//         },
//         {
//           name: "Aples",
//           info: "3kg",
//           id: "ekflkdsdsaljd",
//           checked: false
//         },
//         {
//           name: "Beef",
//           info: "1kg",
//           id: "frefp43ifjdsfs",
//           checked: false
//         }
//       ],
//       costs: [
//         {
//           chosenItems: [],
//           count: 1,
//           date: "24.06.2019, 15:01",
//           category: "bill"
//         },
//         {
//           chosenItems: ["Potatoes"],
//           count: 3,
//           date: "24.06.2019, 14:57",
//           category: "shopping"
//         },
//         {
//           chosenItems: ["sds"],
//           count: 2,
//           date: "24.06.2019, 14:57",
//           category: "health"
//         },
//         {
//           chosenItems: ["Aples"],
//           count: 3,
//           date: "24.06.2019, 14:57",
//           category: "bill"
//         },
//         {
//           chosenItems: ["sds"],
//           count: 2,
//           date: "24.06.2019, 14:59",
//           category: "shopping"
//         },
//         {
//           chosenItems: ["Rice"],
//           count: 1,
//           date: "24.06.2019, 14:57",
//           category: "car"
//         },
//         {
//           chosenItems: [],
//           count: 3,
//           date: "24.06.2019, 14:57",
//           category: "bill"
//         },

//         {
//           chosenItems: [],
//           count: 1,
//           date: "24.05.2019, 15:01",
//           category: "bill"
//         },
//         {
//           chosenItems: ["Potatoes"],
//           count: 3,
//           date: "24.05.2019, 14:57",
//           category: "car"
//         },
//         {
//           chosenItems: ["sds"],
//           count: 2,
//           date: "24.05.2019, 14:57",
//           category: "bill"
//         },
//         {
//           chosenItems: ["Aples"],
//           count: 3,
//           date: "24.05.2019, 14:57",
//           category: "health"
//         },
//         {
//           chosenItems: ["sds"],
//           count: 2,
//           date: "24.05.2019, 14:59",
//           category: "shopping"
//         },
//         {
//           chosenItems: ["Rice"],
//           count: 1,
//           date: "24.05.2019, 14:57",
//           category: "health"
//         },
//         {
//           chosenItems: [],
//           count: 3,
//           date: "24.05.2019, 14:57",
//           category: "bill"
//         },

//         {
//           chosenItems: [],
//           count: 1,
//           date: "24.04.2019, 15:01",
//           category: "shopping"
//         },
//         {
//           chosenItems: ["Potatoes"],
//           count: 3,
//           date: "24.04.2019, 14:57",
//           category: "bill"
//         },
//         {
//           chosenItems: ["sds"],
//           count: 2,
//           date: "24.04.2019, 14:57",
//           category: "shopping"
//         },
//         {
//           chosenItems: ["Aples"],
//           count: 3,
//           date: "24.04.2019, 14:57",
//           category: "bill"
//         },
//         {
//           chosenItems: ["sds"],
//           count: 2,
//           date: "24.04.2019, 14:59",
//           category: "bill"
//         },
//         {
//           chosenItems: ["Rice"],
//           count: 1,
//           date: "24.04.2019, 14:57",
//           category: "bill"
//         },
//         {
//           chosenItems: [],
//           count: 3,
//           date: "24.04.2019, 14:57",
//           category: "shopping"
//         }
//       ]
//     }, (err, result) => {
// // console.log('result', JSON.stringify(result.ops));
//     })
//   }

// })

const appRouter = app => {
  app
    .route("/store/items")
    .get((req, res) => {
      sortItemsByName(req.headers.id);

      mongoose
        .connect(url)
        .then(() => console.log("MongoDB connected…"))
        .catch(err => console.log(err));

      res.status(200).send(store[req.headers.id].items);
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
