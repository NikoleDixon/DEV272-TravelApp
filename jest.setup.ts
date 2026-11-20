// jest.setup.ts: runs before every test file (see "setupFiles" under "jest"
// in package.json). Tests run in Node on your computer, not on a phone, so
// native code and secrets get stand-ins here.

// Mock AsyncStorage for tests.
import mockAsyncStorage from "@react-native-async-storage/async-storage/jest/async-storage-mock";

jest.mock("@react-native-async-storage/async-storage", () => mockAsyncStorage);

// Fake values for tests. The real keys stay in .env.
process.env.EXPO_PUBLIC_SUPABASE_URL = "https://test.supabase.co";
process.env.EXPO_PUBLIC_SUPABASE_KEY = "sb_publishable_test";
