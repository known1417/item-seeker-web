
import { useState } from "react";
import { getItems } from "@/services/mockData";
import ItemCard from "@/components/ItemCard";
import SearchBar from "@/components/SearchBar";

const LostItems = () => {
  const allItems = getItems();
  const lostItems = allItems.filter(item => item.type === 'lost');

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4 text-lost">Lost Items</h1>
        <p className="text-muted-foreground mb-6">
          Browse all reported lost items. If you found any of these items, please contact the owner.
        </p>
        <SearchBar className="mb-6 max-w-lg" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {lostItems.map(item => (
          <ItemCard key={item.id} item={item} />
        ))}
        
        {lostItems.length === 0 && (
          <div className="col-span-full text-center py-10">
            <p className="text-muted-foreground">No lost items reported yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LostItems;
