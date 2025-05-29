
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Clock } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";

interface LaundryService {
  name: string;
  price: string;
}

interface NearbyLaundryProps {
  id: string;
  name: string;
  rating: number;
  distance: string;
  address: string;
  openUntil: string;
  services: LaundryService[];
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
    navigate('/order', { 
      state: { 
        laundryId: id, 
        laundryName: name,
        laundryServices: services 
      } 
    });
  };
  
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Card className="overflow-hidden border-gray-100 hover:shadow-lg transition-all duration-300 h-full">
        <CardContent className="p-5">
          <div className="flex justify-between items-start mb-3">
            <h3 className="font-semibold text-base text-left">{name}</h3>
            <div className="flex items-center text-sm bg-yellow-50 px-2 py-1 rounded-full">
              <Star className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500 mr-1" />
              <span className="font-medium">{rating.toFixed(1)}</span>
            </div>
          </div>
          
          <div className="flex items-center text-xs text-muted-foreground mb-3">
            <MapPin className="h-3 w-3 mr-1" />
            <span className="mr-2">{distance}</span>
            <Clock className="h-3 w-3 mr-1 ml-2" />
            <span>Open until {openUntil}</span>
          </div>
          
          <p className="text-xs text-gray-500 mb-3 truncate">{address}</p>
          
          <div className="mb-4">
            <h4 className="text-xs font-semibold text-gray-700 mb-2">Services offered:</h4>
            <div className="space-y-1">
              {services.slice(0, 3).map((service, index) => (
                <div key={index} className="flex justify-between items-center text-xs">
                  <span className="text-gray-600">{service.name}</span>
                  <Badge variant="outline" className="text-xs bg-accent/50 text-primary/80 border-none">
                    {service.price}
                  </Badge>
                </div>
              ))}
              {services.length > 3 && (
                <span className="text-xs text-muted-foreground">+{services.length - 3} more services</span>
              )}
            </div>
          </div>
          
          <Button 
            size="sm" 
            className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
            onClick={handleOrderClick}
          >
            Order from {name}
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default NearbyLaundry;
