import { create } from "zustand";

// Define the application state interface
interface Filters {
  searchTerm?: string;                      // Optional to allow setting dynamically
  selectedCategory?: string;
  sortBy?: string | "";
}

interface AppState {
  filters: Filters;                         // Group all filters into a single object
  setFilters: (newFilters: Partial<Filters>) => void; // Action to set filters
}

// Create the Zustand store with a single 'filters' object to handle all state
export const useSearchStore = create<AppState>((set) => ({
  filters: {
    searchTerm: '',                        // Default empty values
    selectedCategory: '',
    sortBy: '',                   
  },

  // Function to update the 'filters' state
  setFilters: (newFilters: Partial<Filters>) => set((state) => ({
    filters: {
      ...state.filters,                    // Spread existing filters to preserve unchanged values
      ...newFilters,                       // Overwrite only the new values
    },
  })),
}));
