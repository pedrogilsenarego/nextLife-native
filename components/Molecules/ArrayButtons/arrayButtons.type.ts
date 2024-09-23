export type ArrayButtonsProps<T extends string> = {
  buttons: T[];
  invertColors?: boolean;
  onSelected?: (selected: T) => void;
};
