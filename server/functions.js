const sortByName = items => items.sort((a, b) => a.name.localeCompare(b.name));

const sortCosts = costs => {
  const newCosts = costs;
  const dates = [];

newCosts.forEach(cost => {
  if (cost.date[2] !== '/'){
    cost.date = `0${cost.date}`
  }
})

newCosts.forEach(cost => dates.push(cost.date));

  const replaceAll = (find, replace, str) =>
    str.replace(new RegExp(find, "g"), replace);

  dates.sort((a, b) => {
    var aa =
        a
          .substring(0, 10)
          .split("/")
          .reverse()
          .join() + replaceAll(":", "", a.substring(11, 20)),
      bb =
        b
          .substring(0, 10)
          .split("/")
          .reverse()
          .join() + replaceAll(":", "", b.substring(11, 20));

    return aa < bb ? -1 : aa > bb ? 1 : 0;
  });

  dates.reverse();

  const displayedCosts = [];

  dates.forEach(date => {
    for (let cost of newCosts) {
      if (cost.date === date && !displayedCosts.includes(cost)) {
        displayedCosts.push(cost);
        break;
      }
    }
  });

  displayedCosts.forEach(cost => {
    if (cost.date.slice(11) === "00:00") {
      cost.date = cost.date.slice(0, 10);
    }
  });

  return displayedCosts;
};

const sortByCheckedValue = items => {
  let checkedItems = [];
  let uncheckedItems = [];
  items.forEach(item =>
    item.checked ? checkedItems.push(item) : uncheckedItems.push(item)
  );
  return [...checkedItems, ...uncheckedItems];
};

const newUserProfile = id => {
  return {
    usr: id,
    items: [],
    selected: [],
    costs: []
  };
};

module.exports = { sortByName, sortCosts, sortByCheckedValue, newUserProfile };
