import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import Login from "./login";
import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ModalProvider } from "@/providers/ModalContext";
import { ThemeProvider } from "@/providers/ThemeContext";
import Loading from "@/components/Atoms/Loading";
import { AppProvider } from "@/providers/AppProvider";
import TabOneScreen from "./(tabs)";
import { setStatusBarStyle, StatusBar } from "expo-status-bar";
import { AppState } from "react-native";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loading, setLoading] = useState(true);
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });
  const [session, setSession] = useState<Session | null>(null);
  const [appState, setAppState] = useState(AppState.currentState);
  const queryClient = new QueryClient();

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (appState.match(/inactive|background/) && nextAppState === "active") {
        setStatusBarStyle("light");
      }
      setAppState(nextAppState);
    });

    return () => {
      // Cleanup listener on unmount
      subscription.remove();
    };
  }, [appState]);

  useEffect(() => {
    setLoading(true);
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return loading ? (
    <Loading />
  ) : (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <ThemeProvider>
          <ModalProvider>
            <StatusBar style="light" />
            {session ? <RootLayoutNav /> : <LoginLayout />}
          </ModalProvider>
        </ThemeProvider>
      </AppProvider>
    </QueryClientProvider>
  );
}

function LoginLayout() {
  return <Login />;
}

function RootLayoutNav() {
  return <TabOneScreen />;
}
