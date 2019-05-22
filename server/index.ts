const store = {
  items: [
    {
      name: "Bread",
      info: "Buy in Lidl",
      id: "sdfsdfsadfsdfdsf",
      checked: false
    },
    {
      name: "Cola",
      info: "",
      id: "gfvfsddwed",
      checked: false
    },
    {
      name: "Milk",
      info: "Buy in Tesco",
      id: "324rijdsojfddsaoid",
      checked: false
    },
    {
      name: "Beer",
      info: "",
      id: "fdswefi343fdsdf",
      checked: false
    },
    {
      name: "Bananas",
      info: "10pcs",
      id: "fdswefi3ddddddddddd",
      checked: false
    }
  ],
  selected: [
    {
      name: "Ham",
      info: "In slices",
      id: "43rpijdskjfna",
      checked: false
    },
    {
      name: "Rice",
      info: "",
      id: "e3rijfisdnc.kas3",
      checked: false
    },
    {
      name: "Potatoes",
      info: "Buy in Tesco",
      id: "43ifpjsdljnfew33",
      checked: false
    },
    {
      name: "Aples",
      info: "3kg",
      id: "ekflkdsdsaljd",
      checked: false
    },
    {
      name: "Beef",
      info: "1kg",
      id: "frefp43ifjdsfs",
      checked: false
    }
  ],
  costs: []
};

const sortItemsByName = () =>
  store.items.sort((a, b) => a.name.localeCompare(b.name));

const sortSelectedByCheckedValue = () => {
  let checkedItems = [];
  let uncheckedItems = [];
  store.selected.forEach(item =>
    item.checked ? checkedItems.push(item) : uncheckedItems.push(item)
  );
  store.selected = [...checkedItems, ...uncheckedItems];
};

const appRouter = app => {
  app.get("/", (req, res) => {
    res.send("ShoppingList API!\n");
  });

  app
    .route("/store/items")
    .get((req, res) => {
      console.log("get items");
      console.log(JSON.stringify(req.headers.token));
      sortItemsByName();
      res.status(200).send(store.items);
    })
    .post((req, res) => {
      store.items.push(req.body.data.item);

      sortItemsByName();
      res.status(200).send(store.items);
    })
    .put((req, res) => {
      const { index, newItem } = req.body.data;

      store.items[index] = newItem;
      res.status(200).json(store.items);
    })
    .delete((req, res) => {
      store.items.splice(req.body.index, 1);
      res.status(200).json(store.items);
    });

  app
    .route("/store/selected")
    .get((req, res) => {
      sortSelectedByCheckedValue();
      res.status(200).json(store.selected);
    })
    .put((req, res) => {
      const { index, newItem } = req.body.data;

      store.selected[index] = newItem;
      res.status(200).json(store.selected);
    });

  app.put("/store/checked", (req, res) => {
    const { index } = req.body.data;
    if (store.selected[index]) {
      store.selected[index].checked = !store.selected[index].checked;
    }
  });

  app
    .route("/store/costs")
    .get((req, res) => {
      res.status(200).json(store.costs);
    })
    .post((req, res) => {
      store.costs.unshift(req.body.data.cost);
      res.status(200).json(store.costs);
    });

  app.put("/store", (req, res) => {
    const { items, selected } = req.body.data;

    if (items !== store.items) store.items = items;
    if (selected !== store.selected) store.selected = selected;
    res.status(200).json(store);
  });
};

module.exports = appRouter;
