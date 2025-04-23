
import { useState } from "react";
import { getItems } from "@/services/mockData";
import ItemCard from "@/components/ItemCard";
import SearchBar from "@/components/SearchBar";

const FoundItems = () => {
  const allItems = getItems();
  const foundItems = allItems.filter(item => item.type === 'found');

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4 text-found">Found Items</h1>
        <p className="text-muted-foreground mb-6">
          Browse all reported found items. If you lost any of these items, please contact the finder.
        </p>
        <SearchBar className="mb-6 max-w-lg" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {foundItems.map(item => (
          <ItemCard key={item.id} item={item} />
        ))}
        
        {foundItems.length === 0 && (
          <div className="col-span-full text-center py-10">
            <p className="text-muted-foreground">No found items reported yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FoundItems;
