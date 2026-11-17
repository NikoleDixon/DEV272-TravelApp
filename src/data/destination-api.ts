import type { Destination } from "../types/destination";
import { destinations } from "./destinations";

// Change to true to test the error state.
const FORCE_ERROR = false;

export async function fetchDestinations(): Promise<Destination[]> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  if (FORCE_ERROR) {
    throw new Error("Unable to load destinations.");
  }

  return destinations;
}

export async function fetchDestination(
  id: string,
): Promise<Destination | null> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  if (FORCE_ERROR) {
    throw new Error("Unable to load destination.");
  }

  const destination = destinations.find((item) => item.id === id);

  if (destination) {
    return destination;
  }

  return null;
}
