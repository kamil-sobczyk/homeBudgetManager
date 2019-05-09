import { Item } from './interfaces';

interface DroppablePlace {
  index: number;
  droppableId: string;
}

export const reorder = (list: Item[], startIndex: number, endIndex: number): Item[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export const move = (
  source: Item[],
  destination: Item[],
  droppableSource: DroppablePlace,
  droppableDestination: DroppablePlace
) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result: {[key: string]: Item[]} = {};

  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

export const sortItemsByName = (items: Item[]): Item[] =>
  items.sort((a: Item, b: Item): number => a.name.localeCompare(b.name));
