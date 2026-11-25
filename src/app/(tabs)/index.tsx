import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import CategoryFilter from "../../components/CategoryFilter";
import DestinationCard from "../../components/DestinationCard";
import EmptyState from "../../components/EmptyState";
import ErrorMessage from "../../components/ErrorMessage";
import LoadingSkeleton from "../../components/LoadingSkeleton";
import ResultsHeading from "../../components/ResultsHeading";
import ScreenHeader from "../../components/ScreenHeader";
import { categories, getCategoryLabel } from "../../constants/categories";
import { useColorMode } from "../../context/ColorMode";
import { colors, fontSize, spacing } from "../../design/themes";
import { useBucketList } from "../../hooks/useBucketList";
import { useDestinations } from "../../hooks/useDestinations";

export default function Index() {
  const router = useRouter();
  const { colorMode } = useColorMode();
  const theme = colors[colorMode];

  // Get destination data and loading or error status.
  const { data, isLoading, isError } = useDestinations();

  // Saved destinations come from the shared bucket list (same data as the Bucket List tab).
  const { savedIds, toggleSave } = useBucketList();

  // Store search text and selected category.
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Wait 300 milliseconds after the user stops typing.
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchText);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchText]);

  const selected = categories.find(
    (category) => category.value === selectedCategory,
  );

  // Filter destinations by search text and category.
  const filteredDestinations = (data ?? []).filter((item) => {
    const search = debouncedSearch.toLowerCase();

    const matchesSearch =
      item.name.toLowerCase().includes(search) ||
      item.country.toLowerCase().includes(search) ||
      item.region.toLowerCase().includes(search);

    const matchesCategory =
      selectedCategory === "all" || selected?.types.includes(item.category);

    return matchesSearch && matchesCategory;
  });

  // Add or remove a destination from the bucket list.
  // Signed-out users are sent to Profile.
  const handleToggleSave = async (id: string) => {
    const result = await toggleSave(id);

    if (result === "signed-out") {
      router.push("/(tabs)/profile");
    } else if (result === "error") {
      Alert.alert(
        "Couldn't update your bucket list",
        "Please try again in a moment.",
      );
    }
  };

  // Show loading placeholders while destinations load.
  if (isLoading) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <ScreenHeader title="Discover, Save and Explore" />
        <Text style={[styles.loadingText, { color: theme.secondaryText }]}>
          Loading destinations...
        </Text>
        <View style={styles.skeletons}>
          <LoadingSkeleton />
          <LoadingSkeleton />
          <LoadingSkeleton />
        </View>
      </View>
    );
  }

  // Show an error message if destinations fail to load.
  if (isError) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <ScreenHeader title="Discover, Save and Explore" />
        <ErrorMessage
          title="Unable to load destinations"
          message="Please try again later."
        />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ScreenHeader
        title="Discover, Save and Explore"
        subtitle="Find your next trip"
      />

      {/* Search destinations and clear the search text. */}
      <View style={styles.searchRow}>
        <TextInput
          style={[
            styles.searchInput,
            {
              backgroundColor: theme.elementBackground,
              borderColor: theme.inputBorder,
              color: theme.mainText,
            },
          ]}
          placeholder="Search destinations..."
          placeholderTextColor={theme.secondaryText}
          accessibilityLabel="Search destinations"
          value={searchText}
          onChangeText={setSearchText}
        />

        {searchText.length > 0 && (
          <Pressable
            style={[
              styles.clearButton,
              { backgroundColor: theme.btnBackground },
            ]}
            onPress={() => setSearchText("")}
            accessibilityRole="button"
            accessibilityLabel="Clear search"
          >
            <Text style={[styles.clearButtonText, { color: theme.btnText }]}>
              Clear Search
            </Text>
          </Pressable>
        )}
      </View>

      <CategoryFilter
        categories={categories}
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />

      <ResultsHeading
        title={
          selectedCategory === "all"
            ? "All destinations"
            : (selected?.label ?? "")
        }
        count={filteredDestinations.length}
      />

      {/* Display destination cards or an empty results message. */}
      <FlatList
        data={filteredDestinations}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        ItemSeparatorComponent={() => <View style={styles.cardSeparator} />}
        ListEmptyComponent={
          <EmptyState
            title="No destinations found"
            message="Try another name or category."
          />
        }
        renderItem={({ item }) => (
          <DestinationCard
            name={item.name}
            country={item.country}
            category={getCategoryLabel(item.category)}
            imageUrl={item.image_url}
            isSaved={savedIds.includes(item.id)}
            onToggleSave={() => handleToggleSave(item.id)}
            onPress={() =>
              router.push({
                pathname: "/destination/[id]",
                params: { id: item.id },
              })
            }
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.xl,
  },
  loadingText: {
    fontSize: fontSize.body,
    marginBottom: spacing.md,
  },
  skeletons: {
    gap: spacing.md,
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  searchInput: {
    flex: 1,
    minHeight: 48,
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: spacing.lg,
    fontSize: fontSize.body,
  },
  clearButton: {
    minHeight: 48,
    paddingHorizontal: spacing.lg,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  clearButtonText: {
    fontSize: fontSize.caption,
    fontWeight: "600",
  },
  listContainer: {
    flexGrow: 1,
    paddingBottom: spacing.xl,
  },
  cardSeparator: {
    height: spacing.lg,
  },
});
