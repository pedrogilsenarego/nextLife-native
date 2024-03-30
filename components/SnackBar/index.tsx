import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Animated, Text, View } from "react-native";

interface SnackbarState {
  open: boolean;
  message: string;
  type: null | "success" | "fail";
  color: string;
  bgcolor: string;
  icon: any;
}

const INITIALSTATE = {
  open: false,
  message: "",
  type: null,
  icon: null,
  color: "orangered",
  bgcolor: "white",
};

const Snackbar = () => {
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    ...INITIALSTATE,
  });
  const { general } = useSnackbar();

  const { notificationMessage, notificationType } = general;

  const getSnackbarElements = (type: string) => {
    switch (type) {
      case "information":
        return {
          icon: (
            <Ionicons name="arrow-back-outline" size={17} color="orangered" />
          ),
        };
      case "fail":
        return {
          icon: <Ionicons name="warning-outline" size={20} color="red" />,
        };
      case "success":
        return {
          icon: (
            <Ionicons name="checkbox-outline" size={24} color="orangered" />
          ),
        };
      default:
        return {
          icon: <Ionicons name="arrow-back-outline" size={17} color="white" />,
        };
    }
  };

  useEffect(() => {
    if (notificationType !== null) {
      const { icon } = getSnackbarElements(notificationType);
      setSnackbar({
        ...snackbar,
        open: true,
        icon: icon,
        message: notificationMessage,
        type: notificationType,
      });

      // Set a timeout to close the Snackbar after 3000ms (adjust as needed)
      const timeoutId = setTimeout(() => {
        handleClose();
      }, 3000);

      return () => clearTimeout(timeoutId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [general]);

  const handleClose = () => {
    setSnackbar({ ...INITIALSTATE });
  };

  return (
    <>
      {snackbar.open && (
        <Animated.View
          style={{
            position: "absolute",
            borderRadius: 6,
            borderWidth: 2,
            borderColor: "orangered",
            zIndex: 2000,
            bottom: 100,
            right: 20,
            left: 20,
            backgroundColor: snackbar.bgcolor,
            padding: 16,
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "center",
            shadowColor: "#00000066",
            shadowOpacity: 0.4,
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 2,
            elevation: 4,
          }}
        >
          <Text style={{ color: "orangered", marginRight: 8 }}>
            {snackbar.icon}
          </Text>
          <Text style={{ color: "orangred", marginTop: 0, fontSize: 18 }}>
            {snackbar.message}
          </Text>
        </Animated.View>
      )}
    </>
  );
};

export default Snackbar;
