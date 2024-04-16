export type ArrayButtonsProps<T extends string> = {
  buttons: T[];
  onSelected?: (selected: T) => void;
};
