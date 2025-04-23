
import { useState } from "react";
import { getItems } from "@/services/mockData";
import ItemCard from "@/components/ItemCard";
import SearchBar from "@/components/SearchBar";
import ItemFilter from "@/components/ItemFilter";
import { ItemType } from "@/types";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Home = () => {
  const { user } = useAuth();
  const [filter, setFilter] = useState<ItemType | 'all'>('all');
  
  const allItems = getItems();
  const items = filter === 'all' 
    ? allItems 
    : allItems.filter(item => item.type === filter);

  return (
    <div className="container py-8">
      <div className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto mb-10">
        <h1 className="text-4xl font-bold mb-4">Welcome to FindIt</h1>
        <p className="text-lg text-muted-foreground mb-6">
          The community platform for reporting lost items and connecting people who found something with those who lost it.
        </p>
        <div className="w-full mb-6">
          <SearchBar className="mx-auto" />
        </div>
        <div className="flex flex-wrap gap-3 items-center justify-center">
          {user ? (
            <Link to="/post-item">
              <Button className="gap-2">
                <PlusCircle size={18} /> Post an Item
              </Button>
            </Link>
          ) : (
            <Link to="/login">
              <Button>Login to Post an Item</Button>
            </Link>
          )}
        </div>
      </div>
      
      <div className="mb-6">
        <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
          <h2 className="text-2xl font-bold">Recent Items</h2>
          <ItemFilter selectedFilter={filter} onFilterChange={setFilter} />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map(item => (
            <ItemCard key={item.id} item={item} />
          ))}
          
          {items.length === 0 && (
            <div className="col-span-full text-center py-10">
              <p className="text-muted-foreground">No items found matching your criteria.</p>
              
              {user ? (
                <Link to="/post-item" className="mt-4 inline-block">
                  <Button>Post a New Item</Button>
                </Link>
              ) : (
                <Link to="/login" className="mt-4 inline-block">
                  <Button>Login to Post</Button>
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
