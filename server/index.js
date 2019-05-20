const store = {
  "ogar616@gmail.com": {
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
  }
};

let activeUser = "";
let usersCount = 0;

const sortItemsByName = () =>
  store[activeUser].items.sort((a, b) => a.name.localeCompare(b.name));

const sortSelectedByCheckedValue = () => {
  let checkedItems = [];
  let uncheckedItems = [];
  store[activeUser].selected.forEach(item =>
    item.checked ? checkedItems.push(item) : uncheckedItems.push(item)
  );
  store[activeUser].selected = [...checkedItems, ...uncheckedItems];
};

const appRouter = app => {
  app.get("/", (req, res) => {
    res.send("ShoppingList API!\n");
  });

  app.post("/store/", (req, res) => {
    const { user } = req.body.data;
    if (!store[user]) {
      store[user] = { items: [], selected: [], costs: [] };
      usersCount++;
    }
    activeUser = user;
  });

  app.get("/store/items", (req, res) => {
    sortItemsByName();
    res.status(200).send(store[activeUser].items);
  });

  app.post("/store/items", (req, res) => {
    const { user, item } = req.body.data;

    store[user].items.push(item);
    sortItemsByName(user);
    res.status(200).send(store[user].items);
  });

  app.put("/store/items", (req, res) => {
    const { index, newItem, user } = req.body.data;

    store[user].items[index] = newItem;
    res.status(200).json(store[user].items);
  });

  app.delete("/store/items", (req, res) => {
    const { user, index } = req.body.data;
    store[user].items.splice(index, 1);
    res.status(200).json(store[user].items);
  });

  app.get("/store/selected", (req, res) => {
    sortSelectedByCheckedValue();
    res.status(200).json(store[activeUser].selected);
  });

  app.put("/store/checked", (req, res) => {
    const { index, user } = req.body.data;
    if (store[user].selected[index]) {
      store[user].selected[index].checked = !store[user].selected[index]
        .checked;
    }
  });

  app.put("/store/selected", (req, res) => {
    const { index, newItem, user } = req.body.data;

    store[user].selected[index] = newItem;
    res.status(200).json(store[user].selected);
  });

  app.get("/store/costs", (req, res) => {
    res.status(200).json(store[activeUser].costs);
  });

  app.post("/store/costs", (req, res) => {
    const { user, cost } = req.body.data;
    store[user].costs.unshift(cost);
    res.status(200).json(store[user].costs);
  });

  app.put("/store", (req, res) => {
    const { items, selected, user } = req.body.data;

    if (items !== store[user].items) store[user].items = items;
    if (selected !== store[user].selected) store[user].selected = selected;
    res.status(200).json(store[user]);
  });
};

module.exports = appRouter;
