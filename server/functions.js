const sortByName = items => items.sort((a, b) => a.name.localeCompare(b.name));

const sortByCheckedValue = items => {
  let checkedItems = [];
  let uncheckedItems = [];
  items.forEach(item =>
    item.checked ? checkedItems.push(item) : uncheckedItems.push(item)
  );
  return [...uncheckedItems, ...checkedItems];
};

const newUserProfile = id => {
  return {
    usr: id,
    items: [],
    selected: [],
    costs: []
  };
};

module.exports = { sortByName, sortByCheckedValue, newUserProfile };
