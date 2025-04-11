
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Clock } from "lucide-react";
import { useNavigate } from 'react-router-dom';

interface NearbyLaundryProps {
  id: string;
  name: string;
  rating: number;
  distance: string;
  address: string;
  openUntil: string;
  services: string[];
}

const NearbyLaundry: React.FC<NearbyLaundryProps> = ({
  id,
  name,
  rating,
  distance,
  address,
  openUntil,
  services
}) => {
  const navigate = useNavigate();
  
  const handleOrderClick = () => {
    navigate('/order', { state: { laundryId: id, laundryName: name } });
  };
  
  return (
    <Card className="overflow-hidden hover:shadow-md transition-all border-gray-100 hover:border-primary/20">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-base">{name}</h3>
          <div className="flex items-center text-sm">
            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
            <span>{rating.toFixed(1)}</span>
          </div>
        </div>
        
        <div className="flex items-center text-xs text-muted-foreground mb-2">
          <MapPin className="h-3 w-3 mr-1" />
          <span className="mr-2">{distance}</span>
          <Clock className="h-3 w-3 mr-1 ml-2" />
          <span>Open until {openUntil}</span>
        </div>
        
        <p className="text-xs text-gray-500 mb-3 truncate">{address}</p>
        
        <div className="flex flex-wrap gap-1 mb-3">
          {services.map((service, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {service}
            </Badge>
          ))}
        </div>
        
        <Button 
          size="sm" 
          className="w-full"
          onClick={handleOrderClick}
        >
          Order Now
        </Button>
      </CardContent>
    </Card>
  );
};

export default NearbyLaundry;
