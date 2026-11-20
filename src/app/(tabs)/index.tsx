import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import DestinationCard from "../../components/DestinationCard";
import ErrorMessage from "../../components/ErrorMessage";
import LoadingSkeleton from "../../components/LoadingSkeleton";
import { useColorMode } from "../../context/ColorMode";
import { colors } from "../../design/themes";
import { useDestinations } from "../../hooks/useDestinations";

export default function Index() {
  const router = useRouter();
  const { colorMode } = useColorMode();
  const theme = colors[colorMode];

  // Get destination data and loading or error status.
  const { data, isLoading, isError } = useDestinations();

  // Store search text, selected category, and saved destinations.
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [savedDestinationIds, setSavedDestinationIds] = useState<string[]>([]);

  // Wait 300 milliseconds after the user stops typing.
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchText);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchText]);

  // Categories displayed in the wireframe.
  const categories = [
    { label: "All", value: "all", types: [] },
    { label: "Beaches", value: "beaches", types: ["beach"] },
    {
      label: "Nature",
      value: "nature",
      types: ["mountains", "adventure"],
    },
    {
      label: "Cities",
      value: "cities",
      types: ["city", "history"],
    },
  ];

  // Filter destinations by search text and category.
  const filteredDestinations = (data ?? []).filter((item) => {
    const search = debouncedSearch.toLowerCase();

    const matchesSearch =
      item.name.toLowerCase().includes(search) ||
      item.country.toLowerCase().includes(search) ||
      item.region.toLowerCase().includes(search);

    const selected = categories.find(
      (category) => category.value === selectedCategory,
    );

    const matchesCategory =
      selectedCategory === "all" || selected?.types.includes(item.category);

    return matchesSearch && matchesCategory;
  });

  // Add or remove a destination from the saved list.
  const toggleSave = (id: string) => {
    if (savedDestinationIds.includes(id)) {
      setSavedDestinationIds(
        savedDestinationIds.filter((savedId) => savedId !== id),
      );
    } else {
      setSavedDestinationIds([...savedDestinationIds, id]);
    }
  };

  // Show loading placeholders while destinations load.
  if (isLoading) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <Text style={[styles.title, { color: theme.mainText }]}>
          Discover, Save and Explore
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
          Discover, Save and Explore
        </Text>

        <ErrorMessage
          title="Unable to load destinations"
          message="Please try again later."
        />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Explore screen header */}
      <Text style={[styles.title, { color: theme.mainText }]}>
        Discover, Save and Explore
      </Text>

      <Text style={[styles.subtitle, { color: theme.secondaryText }]}>
        Find your next trip
      </Text>
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
          >
            <Text style={[styles.clearButtonText, { color: theme.btnText }]}>
              Clear Search
            </Text>
          </Pressable>
        )}
      </View>

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
              Try another name or category.
            </Text>
          </View>
        }
        renderItem={({ item }) => {
          const categoryLabel =
            categories.find((category) =>
              category.types.includes(item.category),
            )?.label || "Cities";

          return (
            <DestinationCard
              name={item.name}
              country={item.country}
              category={categoryLabel}
              imageUrl={item.image_url}
              isSaved={savedDestinationIds.includes(item.id)}
              onToggleSave={() => toggleSave(item.id)}
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
    marginBottom: 24,
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 16,
  },
  clearButton: {
    height: 48,
    paddingHorizontal: 14,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  clearButtonText: {
    fontSize: 14,
    fontWeight: "600",
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
});
