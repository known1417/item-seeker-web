
import { useParams, Link } from "react-router-dom";
import { getItemById, claimItem, unclaimItem } from "@/services/mockData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Share2, ArrowLeft, Check, X } from "lucide-react";
import { formatDistance } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { getCurrentUser } from "@/services/mockData";

const ItemDetail = () => {
  const { id } = useParams<{ id: string }>();
  const item = getItemById(id ?? "");
  const { toast } = useToast();
  const currentUser = getCurrentUser();
  
  if (!item) {
    return (
      <div className="container py-10 text-center">
        <h2 className="text-2xl font-bold mb-4">Item Not Found</h2>
        <p className="mb-6">The item you're looking for doesn't exist or has been removed.</p>
        <Link to="/">
          <Button>Return to Home</Button>
        </Link>
      </div>
    );
  }
  
  const formattedDate = new Date(item.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  
  const timeAgo = formatDistance(
    new Date(item.createdAt),
    new Date(),
    { addSuffix: true }
  );

  const handleClaim = () => {
    if (!currentUser) {
      toast({
        title: "Authentication required",
        description: "Please login to claim this item",
        variant: "destructive"
      });
      return;
    }

    const updatedItem = claimItem(item.id, currentUser.id);
    if (updatedItem) {
      toast({
        title: "Item claimed",
        description: "You have successfully claimed this item",
      });
      window.location.reload(); // Refresh to show updated state
    }
  };

  const handleUnclaim = () => {
    const updatedItem = unclaimItem(item.id);
    if (updatedItem) {
      toast({
        title: "Item unclaimed",
        description: "The item has been unclaimed",
      });
      window.location.reload(); // Refresh to show updated state
    }
  };

  return (
    <div className="container py-8">
      <Link to="/" className="inline-flex items-center gap-1 mb-6 hover:underline">
        <ArrowLeft size={16} /> Back to all items
      </Link>
      
      <div className="grid md:grid-cols-3 gap-8">
        {/* Item Image */}
        <div className="md:col-span-1">
          {item.imageUrl ? (
            <div className="rounded-lg overflow-hidden border">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-auto object-cover"
              />
            </div>
          ) : (
            <div className={`rounded-lg border h-full flex items-center justify-center p-6 ${
              item.type === 'lost' ? 'bg-lost/5' : 'bg-found/5'
            }`}>
              <p className="text-center text-muted-foreground">No image available</p>
            </div>
          )}
        </div>
        
        {/* Item Details */}
        <div className="md:col-span-2">
          <div className="flex items-center gap-3 mb-2">
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
            <p className="text-sm text-muted-foreground">
              Posted by {item.userName} • {timeAgo}
            </p>
          </div>
          
          <h1 className="text-3xl font-bold mb-4">{item.title}</h1>
          
          <div className="flex items-center gap-2 text-sm mb-3">
            <Calendar size={16} />
            <span>{formattedDate}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm mb-6">
            <MapPin size={16} />
            <span>{item.location}</span>
          </div>
          
          <div className="mb-8">
            <h2 className="font-semibold mb-2">Description</h2>
            <p className="text-muted-foreground whitespace-pre-line">
              {item.description}
            </p>
          </div>
          
          <Card className="mb-6">
            <CardContent className="p-6">
              <h2 className="font-semibold mb-3">Contact Information</h2>
              {item.contactInfo ? (
                <p className="text-muted-foreground">{item.contactInfo}</p>
              ) : (
                <p className="text-muted-foreground">Contact the user for more information.</p>
              )}
            </CardContent>
          </Card>
          
          <div className="flex flex-wrap gap-3">
            {!item.claimed ? (
              <Button 
                onClick={handleClaim}
                className="gap-2"
              >
                <Check className="h-4 w-4" /> Claim Item
              </Button>
            ) : item.claimedBy === currentUser?.id && (
              <Button 
                variant="destructive" 
                onClick={handleUnclaim}
                className="gap-2"
              >
                <X className="h-4 w-4" /> Unclaim Item
              </Button>
            )}
            <Button 
              variant="outline" 
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                toast({
                  title: "Link copied",
                  description: "The link has been copied to your clipboard",
                });
              }}
              className="gap-2"
            >
              <Share2 size={16} /> Share
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;
