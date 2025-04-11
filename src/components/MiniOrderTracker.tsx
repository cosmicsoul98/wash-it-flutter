
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Truck, Package, Clock, ChevronRight } from "lucide-react";
import { useNavigate } from 'react-router-dom';

interface MiniOrderTrackerProps {
  hasActiveOrder: boolean;
  orderId?: string;
  status?: 'pending' | 'processing' | 'delivery' | 'completed';
  estimatedTime?: string;
}

const MiniOrderTracker: React.FC<MiniOrderTrackerProps> = ({
  hasActiveOrder,
  orderId,
  status,
  estimatedTime
}) => {
  const navigate = useNavigate();
  
  const getStatusIcon = () => {
    switch (status) {
      case 'pending':
        return <Clock className="h-5 w-5 text-orange-500" />;
      case 'processing':
        return <Package className="h-5 w-5 text-blue-500" />;
      case 'delivery':
        return <Truck className="h-5 w-5 text-purple-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-400" />;
    }
  };
  
  const getStatusText = () => {
    switch (status) {
      case 'pending':
        return 'Waiting for pickup';
      case 'processing':
        return 'Processing your laundry';
      case 'delivery':
        return 'Out for delivery';
      default:
        return 'No active orders';
    }
  };
  
  const getStatusColor = () => {
    switch (status) {
      case 'pending':
        return 'bg-orange-100 text-orange-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'delivery':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <Card className="bg-gradient-to-r from-gray-50 to-white border-gray-100 hover:shadow-md transition-all overflow-hidden">
      <CardContent className="p-4">
        {hasActiveOrder ? (
          <>
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold">Your Order</h3>
              <Badge variant="outline"># {orderId}</Badge>
            </div>
            
            <div className="flex items-center gap-3 mb-3">
              {getStatusIcon()}
              <div className="flex-1">
                <Badge className={`${getStatusColor()} mb-1`}>
                  {getStatusText()}
                </Badge>
                <p className="text-xs text-muted-foreground">Est. arrival: {estimatedTime}</p>
              </div>
            </div>
            
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full" 
              onClick={() => navigate('/orders')}
            >
              Track Order <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </>
        ) : (
          <div className="flex flex-col items-center py-2">
            <p className="text-sm text-muted-foreground mb-3">No active orders at the moment</p>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full"
              onClick={() => navigate('/')}
            >
              Place New Order
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MiniOrderTracker;
