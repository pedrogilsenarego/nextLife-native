export type ArrayButtonsProps<T extends string> = {
  buttons: T[];
  invertColors?: boolean;
  textColor?: string;
  onSelected?: (selected: T) => void;
};
