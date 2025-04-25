import { Item } from "@/types";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Calendar, MapPin, Check } from "lucide-react";
import { formatDistance } from "date-fns";

interface ItemCardProps {
  item: Item;
}

const ItemCard = ({ item }: ItemCardProps) => {
  const formattedDate = new Date(item.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  
  const timeAgo = formatDistance(
    new Date(item.createdAt),
    new Date(),
    { addSuffix: true }
  );

  return (
    <Link to={`/items/${item.id}`}>
      <Card className="h-full overflow-hidden hover:shadow-md transition-shadow">
        <div className={`h-1 w-full ${item.type === 'lost' ? 'bg-lost' : 'bg-found'}`} />
        
        {item.imageUrl ? (
          <div className="aspect-[4/3] relative">
            <img
              src={item.imageUrl}
              alt={item.title}
              className="object-cover w-full h-full"
            />
            <div className="absolute top-2 right-2 flex gap-2">
              <Badge 
                className={`${
                  item.type === 'lost' 
                    ? 'bg-lost hover:bg-lost/90' 
                    : 'bg-found hover:bg-found/90'
                }`}
              >
                {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
              </Badge>
              {item.claimed && (
                <Badge variant="outline" className="border-green-500 text-green-500">
                  <Check className="mr-1 h-3 w-3" /> Claimed
                </Badge>
              )}
            </div>
          </div>
        ) : (
          <div className={`aspect-[4/3] flex items-center justify-center ${
            item.type === 'lost' ? 'bg-lost/5' : 'bg-found/5'
          }`}>
            <Badge 
              className={`${
                item.type === 'lost' 
                  ? 'bg-lost hover:bg-lost/90' 
                  : 'bg-found hover:bg-found/90'
              }`}
            >
              {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
            </Badge>
          </div>
        )}
        
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg mb-2 line-clamp-1">{item.title}</h3>
          <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
            {item.description}
          </p>
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1.5">
            <Calendar size={12} />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <MapPin size={12} />
            <span className="line-clamp-1">{item.location}</span>
          </div>
        </CardContent>
        
        <CardFooter className="pt-0 px-4 pb-4 text-xs text-muted-foreground">
          Posted by {item.userName} • {timeAgo}
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ItemCard;
