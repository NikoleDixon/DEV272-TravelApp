import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import DestinationCard from "../../components/DestinationCard";
import EmptyState from "../../components/EmptyState";
import ErrorMessage from "../../components/ErrorMessage";
import LoadingSkeleton from "../../components/LoadingSkeleton";
import { useColorMode } from "../../context/ColorMode";
import { colors } from "../../design/themes";
import { useDestinations } from "../../hooks/useDestinations";

export default function Index() {
  const router = useRouter();
  const { colorMode } = useColorMode();
  const theme = colors[colorMode];

  const { data, isLoading, isError } = useDestinations();

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
    { label: "All", value: "all" },
    { label: "Beaches", value: "beaches" },
    { label: "Nature", value: "nature" },
    { label: "Cities", value: "cities" },
  ];

  // Filter destinations by search text and category.
  const filteredDestinations = (data ?? []).filter((item) => {
    const search = debouncedSearch.toLowerCase();

    const matchesSearch =
      item.name.toLowerCase().includes(search) ||
      item.country.toLowerCase().includes(search) ||
      item.region.toLowerCase().includes(search);

    let matchesCategory = false;

    if (selectedCategory === "all") {
      matchesCategory = true;
    } else if (selectedCategory === "beaches" && item.category === "beach") {
      matchesCategory = true;
    } else if (
      selectedCategory === "nature" &&
      (item.category === "mountains" || item.category === "adventure")
    ) {
      matchesCategory = true;
    } else if (
      selectedCategory === "cities" &&
      (item.category === "city" || item.category === "history")
    ) {
      matchesCategory = true;
    }

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
      <Text style={[styles.title, { color: theme.mainText }]}>
        Discover, Save and Explore
      </Text>

      <Text style={[styles.subtitle, { color: theme.secondaryText }]}>
        Find your next trip
      </Text>

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

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryContainer}
      >
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
                  textAlign: "center",
                },
              ]}
            >
              {category.label}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      <View style={styles.resultsHeading}>
        <Text style={[styles.resultsTitle, { color: theme.mainText }]}>
          {selectedCategory === "all"
            ? "All destinations"
            : categories.find((category) => category.value === selectedCategory)
                ?.label}
        </Text>

        <Text style={{ color: theme.secondaryText }}>
          Showing {filteredDestinations.length} places
        </Text>
      </View>

      <FlatList
        data={filteredDestinations}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <EmptyState
            title="No destinations found"
            message="Try another name or category."
            buttonText="Clear search"
            onButtonPress={() => {
              setSearchText("");
              setSelectedCategory("all");
            }}
          />
        }
        renderItem={({ item }) => {
          let categoryLabel = "Cities";

          if (item.category === "beach") {
            categoryLabel = "Beaches";
          } else if (
            item.category === "mountains" ||
            item.category === "adventure"
          ) {
            categoryLabel = "Nature";
          }

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
  searchInput: {
    height: 48,
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  categoryContainer: {
    gap: 8,
    paddingBottom: 20,
  },
  categoryChip: {
    width: 76,
    borderWidth: 1,
    borderRadius: 30,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  categoryText: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  resultsHeading: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  resultsTitle: {
    fontSize: 22,
    fontWeight: "bold",
  },
});
