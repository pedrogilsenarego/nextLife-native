import React from "react";
import { Text as RText, TextProps, TextStyle } from "react-native";
import Skeleton from "../Skeleton";

type Props = { isLoading?: boolean } & TextProps;

export const Text: React.FC<Props> = (props) => {
  if (!props.isLoading) {
    return <RText {...props}>{props.children}</RText>;
  }

  const style = props.style as TextStyle;
  const fontSize = style?.fontSize || 14;
  const lineHeight = style?.lineHeight || fontSize * 1.2;
  const marginVertical = (lineHeight - fontSize) / 2;

  // Safely retrieve marginTop, defaulting to 0 if undefined
  const marginTop =
    marginVertical +
    (typeof style?.marginTop === "number" ? style.marginTop : 0);
  const marginBottom =
    marginVertical +
    (typeof style?.marginBottom === "number" ? style.marginBottom : 0);

  return <Skeleton height={fontSize} style={{ marginTop, marginBottom }} />;
};
