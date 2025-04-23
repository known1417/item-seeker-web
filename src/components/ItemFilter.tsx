
import { Button } from "@/components/ui/button";
import { ItemType } from "@/types";

interface ItemFilterProps {
  selectedFilter: ItemType | 'all';
  onFilterChange: (filter: ItemType | 'all') => void;
}

const ItemFilter = ({ selectedFilter, onFilterChange }: ItemFilterProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant={selectedFilter === 'all' ? 'default' : 'outline'}
        size="sm"
        onClick={() => onFilterChange('all')}
      >
        All Items
      </Button>
      <Button
        variant={selectedFilter === 'lost' ? 'default' : 'outline'}
        size="sm"
        onClick={() => onFilterChange('lost')}
        className={selectedFilter === 'lost' ? 'bg-lost hover:bg-lost/90' : 'text-lost hover:text-lost-DEFAULT hover:border-lost-DEFAULT'}
      >
        Lost Items
      </Button>
      <Button
        variant={selectedFilter === 'found' ? 'default' : 'outline'}
        size="sm"
        onClick={() => onFilterChange('found')}
        className={selectedFilter === 'found' ? 'bg-found hover:bg-found/90' : 'text-found hover:text-found-DEFAULT hover:border-found-DEFAULT'}
      >
        Found Items
      </Button>
    </div>
  );
};

export default ItemFilter;
