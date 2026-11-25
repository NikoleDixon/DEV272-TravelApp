import { Href, useRouter } from "expo-router";
import { useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { Button } from "../../components/Button";
import DestinationCard from "../../components/DestinationCard";
import ErrorMessage from "../../components/ErrorMessage";
import LoadingSkeleton from "../../components/LoadingSkeleton";
import { categories, getCategoryLabel } from "../../constants/categories";
import { useColorMode } from "../../context/ColorMode";
import { useBucketList } from "../../context/SavedBucketList";
import { colors } from "../../design/themes";
import { useDestinations } from "../../hooks/useDestinations";

export default function BucketList() {
  const router = useRouter();
  const { colorMode } = useColorMode();
  const theme = colors[colorMode];

  // Get destination data and loading or error status.
  const { data, isLoading, isError } = useDestinations();

  // Saved destinations come from the shared bucket list (Supabase).
  const {
    savedIds,
    isSignedIn,
    loading: savedLoading,
    toggleSave,
  } = useBucketList();

  // Store selected category and any save error message.
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [saveError, setSaveError] = useState("");

  // Filter destinations by category and bucket list.
  const filteredDestinations = (data ?? []).filter((item) => {
    const selected = categories.find(
      (category) => category.value === selectedCategory,
    );

    const matchesCategory =
      selectedCategory === "all" || selected?.types.includes(item.category);
    const isSaved = savedIds.includes(item.id);

    return matchesCategory && isSaved;
  });

  // Add or remove a destination from the saved list.
  const handleToggle = async (id: string) => {
    const result = await toggleSave(id);

    if (result === "signed-out") {
      router.push("/sign-in" as Href); // TODO: remove "as Href" after sign-in is merged
    } else if (result === "error") {
      setSaveError("Could not update your bucket list. Please try again.");
    } else {
      setSaveError("");
    }
  };

  // Show loading placeholders while destinations or saved items load.
  if (isLoading || savedLoading) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <Text style={[styles.title, { color: theme.mainText }]}>
          Bucket List
        </Text>

        <Text style={{ color: theme.secondaryText }}>
          Loading destinations...
        </Text>

        <LoadingSkeleton />
        <LoadingSkeleton />
        <LoadingSkeleton />
      </View>
    );
  }

  // Show an error message if destinations fail to load.
  if (isError) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <Text style={[styles.title, { color: theme.mainText }]}>
          Bucket List
        </Text>

        <ErrorMessage
          title="Unable to load destinations"
          message="Please try again later."
        />
      </View>
    );
  }

  // Signed out users have no bucket list, so ask them to sign in.
  if (!isSignedIn) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <Text style={[styles.title, { color: theme.mainText }]}>
          Bucket List
        </Text>

        <View style={styles.emptyContainer}>
          <Text style={[styles.emptyTitle, { color: theme.mainText }]}>
            Sign in to see your bucket list
          </Text>

          <Text style={[styles.emptyMessage, { color: theme.secondaryText }]}>
            Your saved destinations are kept with your account.
          </Text>

          <View style={styles.signInButton}>
            <Button
              title="Sign in"
              onPress={() => router.push("/sign-in" as Href)} // TODO: remove "as Href" after sign-in is merged
            />{" "}
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Bucket List screen header */}
      <Text style={[styles.title, { color: theme.mainText }]}>Bucket List</Text>
      <Text style={[styles.subtitle, { color: theme.secondaryText }]}>
        Your next adventure awaits!
      </Text>
      {/* Display category filters. */}
      <View style={styles.categoryContainer}>
        {categories.map((category) => (
          <Pressable
            key={category.value}
            style={[
              styles.categoryChip,
              {
                backgroundColor:
                  selectedCategory === category.value
                    ? theme.btnBackground
                    : theme.elementBackground,
                borderColor: theme.inputBorder,
              },
            ]}
            onPress={() => setSelectedCategory(category.value)}
          >
            <Text
              style={[
                styles.categoryText,
                {
                  color:
                    selectedCategory === category.value
                      ? theme.btnText
                      : theme.mainText,
                },
              ]}
            >
              {category.label}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* Show the selected category and number of results. */}
      <View style={styles.resultsHeading}>
        <Text
          style={[styles.resultsTitle, { color: theme.mainText }]}
          numberOfLines={1}
        >
          {selectedCategory === "all"
            ? "All destinations"
            : categories.find((category) => category.value === selectedCategory)
                ?.label}
        </Text>

        <Text
          style={[styles.resultsCount, { color: theme.secondaryText }]}
          numberOfLines={1}
        >
          Showing {filteredDestinations.length} places
        </Text>
      </View>

      {/* Only shows when saving or removing failed. */}
      {saveError !== "" && (
        <Text
          style={[styles.saveError, { color: theme.errorTextColor }]}
          accessibilityRole="alert"
        >
          {saveError}
        </Text>
      )}

      {/* Display destination cards or an empty results message. */}
      <FlatList
        data={filteredDestinations}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        ItemSeparatorComponent={() => <View style={styles.cardSeparator} />}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={[styles.emptyTitle, { color: theme.mainText }]}>
              No destinations found
            </Text>

            <Text style={[styles.emptyMessage, { color: theme.secondaryText }]}>
              Try another category or add a destination.
            </Text>
          </View>
        }
        renderItem={({ item }) => {
          const categoryLabel = getCategoryLabel(item.category);

          return (
            <DestinationCard
              name={item.name}
              country={item.country}
              category={categoryLabel}
              imageUrl={item.image_url}
              isSaved={savedIds.includes(item.id)}
              onToggleSave={() => handleToggle(item.id)}
              onPress={() =>
                router.push({
                  pathname: "/destination/[id]",
                  params: { id: item.id },
                })
              }
            />
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  categoryContainer: {
    height: 64,
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    marginBottom: 16,
  },
  categoryChip: {
    width: 76,
    height: 44,
    flexShrink: 0,
    borderWidth: 1,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  categoryText: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  resultsHeading: {
    height: 40,
    flexShrink: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  resultsTitle: {
    fontSize: 22,
    lineHeight: 28,
    fontWeight: "bold",
  },
  resultsCount: {
    fontSize: 14,
    lineHeight: 20,
  },
  saveError: {
    fontSize: 14,
    marginBottom: 8,
  },
  listContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  cardSeparator: {
    height: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
  emptyMessage: {
    fontSize: 14,
    textAlign: "center",
    marginTop: 8,
  },
  signInButton: {
    alignSelf: "stretch", // makes the button fill the width
    marginTop: 16,
  },
});
