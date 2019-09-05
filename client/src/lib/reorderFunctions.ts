import { Item, ListType } from './interfaces';

interface DroppablePlace {
  index: number;
  droppableId: string;
}

export const reorder = (
  list: Item[],
  startIndex: number,
  endIndex: number
): Item[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export const move = (
  source: Item[],
  destination: Item[],
  droppableSource: DroppablePlace,
  droppableDestination: DroppablePlace,
  chosenCategory: string
) => {
  const result: { [key: string]: Item[] } = {};
  let sourceClone: Item[] = [];

  const restItems = Array.from(source).filter(
    (item: Item) => item.category !== chosenCategory
  );

  if (chosenCategory !== 'All') {
    sourceClone = Array.from(source).filter(
      (item: Item) => item.category === chosenCategory
    );
  } else {
    sourceClone = Array.from(source);
  }

  const destClone = Array.from(destination);

  console.log(JSON.stringify(source));
  console.log(JSON.stringify(destination));
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  let newSource = removeDuplicates([...sourceClone, ...restItems]);
  let newDestination = destClone;

  newSource = newSource.filter((item: Item) => {
    let ret: boolean = true;

    newDestination.forEach((element: Item) => {
      if (element === item) {
        ret = false;
      }
    });

    return ret;
  });

  result[droppableSource.droppableId] = newSource;
  result[droppableDestination.droppableId] = newDestination;

  return result;
};

export const sortItemsByName = (items: Item[]): Item[] =>
  items
    .slice()
    .sort((a: Item, b: Item): number => a.name.localeCompare(b.name));

export const removeDuplicates = (items: Item[]) =>
  items.filter((item: Item, index: number) => items.indexOf(item) === index);
