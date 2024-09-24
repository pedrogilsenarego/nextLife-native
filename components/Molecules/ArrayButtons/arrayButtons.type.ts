export type ArrayButtonsProps<T extends string> = {
  buttons: T[];

  textColor?: string;
  onSelected?: (selected: T) => void;
  defaultValue?: T;
};
