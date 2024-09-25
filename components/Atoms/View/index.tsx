import React, { useState } from "react";
import { View, ViewProps, LayoutChangeEvent } from "react-native";
import Skeleton from "../Skeleton";

type Props = { isLoading?: boolean } & ViewProps;

export const ViewWithSkeleton: React.FC<Props> = (props) => {
  const [size, setSize] = useState<{ width: number; height: number } | null>(
    null
  );

  const onLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setSize({ width, height });
  };

  if (!props.isLoading) {
    return (
      <View {...props} onLayout={onLayout}>
        {props.children}
      </View>
    );
  }

  // Use the size from the children to determine the skeleton size
  return (
    <Skeleton
      width={size?.width} // Default width if size is not available
      height={size?.height} // Default height if size is not available
      style={props.style}
    />
  );
};
