import { Item } from "./../lib/interfaces";

// const reorder = (list: string, startIndex: number, endIndex: number) => {
//   const result = Array.from(list);
//   const [removed] = result.splice(startIndex, 1);
//   result.splice(endIndex, 0, removed);

//   return result;
// };

// const move = (source: string, destination: string, droppableSource: string, droppableDestination: string) => {
//   const sourceClone = Array.from(source);
//   const destClone = Array.from(destination);
//   const [removed] = sourceClone.splice(droppableSource.index, 1);

//   destClone.splice(droppableDestination.index, 0, removed);

//   const result = {};
//   result[droppableSource.droppableId] = sourceClone;
//   result[droppableDestination.droppableId] = destClone;

//   return result;
// };

// interface Item {
// name: string;
// }

const sortItemsByName = (items: Item[]): Item[] =>
  items.sort((a: Item, b: Item): number => a.name.localeCompare(b.name));

export { sortItemsByName };
// reorder, move,
