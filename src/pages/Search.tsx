
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { searchItems } from "@/services/mockData";
import ItemCard from "@/components/ItemCard";
import SearchBar from "@/components/SearchBar";
import ItemFilter from "@/components/ItemFilter";
import { ItemType, Item } from "@/types";

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filter, setFilter] = useState<ItemType | "all">("all");
  const [results, setResults] = useState<Item[]>([]);
  const query = searchParams.get("q") || "";

  useEffect(() => {
    if (query) {
      const items = searchItems(query);
      setResults(items);
    } else {
      setResults([]);
    }
  }, [query]);

  const filteredResults =
    filter === "all"
      ? results
      : results.filter((item) => item.type === filter);

  const handleSearch = (newQuery: string) => {
    setSearchParams({ q: newQuery });
  };

  const handleFilterChange = (newFilter: ItemType | "all") => {
    setFilter(newFilter);
  };

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-6">Search Results</h1>
        <SearchBar onSearch={handleSearch} className="mb-6 mx-auto" />
        
        {query ? (
          <p className="text-muted-foreground mb-4">
            Showing {filteredResults.length} results for "{query}"
          </p>
        ) : (
          <p className="text-muted-foreground mb-4">Enter a search term to find lost or found items.</p>
        )}
        
        <ItemFilter selectedFilter={filter} onFilterChange={handleFilterChange} />
      </div>

      {query && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredResults.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
          
          {filteredResults.length === 0 && (
            <div className="col-span-full py-10 text-center">
              <p className="text-muted-foreground mb-2">No items found matching your search.</p>
              <p className="text-sm text-muted-foreground">Try using different keywords or filters.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
