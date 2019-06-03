const sortByName = items => items.sort((a, b) => a.name.localeCompare(b.name));

const sortCosts = costs => {
  let sortedCosts = costs;

  sortedCosts.forEach(cost => (cost.date = cost.date.replace(/\D/g, "")));

  sortedCosts = sortedCosts
    .sort((a, b) => a.date.localeCompare(b.date))
    .reverse();

  sortedCosts.forEach(cost => (cost.date = adjustDate(cost.date)));

  return sortedCosts;
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

const adjustDate = date => {
  if (date.lenght === 10) {
    return (
      date[0] +
      date[1] +
      "." +
      date[2] +
      date[3] +
      "." +
      date[4] +
      date[5] +
      ", " +
      date[6] +
      date[7] +
      ":" +
      date[8] +
      date[9]
    );
  } else {
    return (
      "0" +
      date[0] +
      "." +
      date[1] +
      date[2] +
      "." +
      date[3] +
      date[4] +
      date[5] +
      date[6] +
      ", " +
      date[7] +
      date[8] +
      ":" +
      date[9] +
      date[10]
    );
  }
};

module.exports = { sortByName, sortCosts, sortByCheckedValue, newUserProfile };
