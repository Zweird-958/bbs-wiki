import React from "react"
import { Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Stack } from "expo-router"
import { FlashList } from "@shopify/flash-list"

import { api } from "@/utils/api"

const Index = () => {
  const characters = api.character.all.useQuery()

  return (
    <SafeAreaView className="bg-[#1F104A]">
      <Stack.Screen options={{ title: "Home Page" }} />
      <View className="h-full w-full p-4">
        {characters.data && (
          <FlashList
            data={characters.data}
            estimatedItemSize={20}
            ItemSeparatorComponent={() => <View className="h-2" />}
            renderItem={({ item: character }) => (
              <Text>{character.fullName}</Text>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  )
}

export default Index
