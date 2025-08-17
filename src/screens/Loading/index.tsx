import { useAuthContext } from "@/context/auth.context";
import { colors } from "@/shared/colors";
import { FC, useEffect } from "react";
import { ActivityIndicator, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Props {
  setLoading: (value: boolean) => void;
}

export const Loading: FC<Props> = ({ setLoading }) => {
  const { restoreUserSession, handleLogout } = useAuthContext();

  useEffect(() => {
    (async () => {
      try {
        const user = await restoreUserSession();

        if (!user) {
          await handleLogout();
        }
      } catch (error) {
        await handleLogout();
      } finally {
        //teste melhor isso aqui no ios
        setLoading(false);
      }
    })();
  }, []);

  return (
    <SafeAreaView className="bg-background-primary items-center justify-center flex-1">
      <>
        <Image
          source={require("@/assets/Logo.png")}
          className="h-[48px] w-[255px]"
        />
        <ActivityIndicator color={colors.white} className="mt-20" />
      </>
    </SafeAreaView>
  );
};
