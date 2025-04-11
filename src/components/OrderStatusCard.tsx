
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Clock, 
  Truck, 
  CheckCircle, 
  ShoppingBasket, 
  Loader 
} from "lucide-react";

interface OrderStatusCardProps {
  orderId: string;
  service: string;
  date: string;
  time: string;
  status: 'pending' | 'processing' | 'delivery' | 'completed';
  items?: number;
}

const OrderStatusCard: React.FC<OrderStatusCardProps> = ({
  orderId,
  service,
  date,
  time,
  status,
  items = 0
}) => {
  const getStatusDetails = () => {
    switch (status) {
      case 'pending':
        return {
          icon: <Clock className="h-6 w-6 text-orange-500" />,
          label: "Pending Pickup",
          color: "bg-orange-100 text-orange-800"
        };
      case 'processing':
        return {
          icon: <Loader className="h-6 w-6 text-blue-500 animate-spin" />,
          label: "Processing",
          color: "bg-blue-100 text-blue-800"
        };
      case 'delivery':
        return {
          icon: <Truck className="h-6 w-6 text-purple-500" />,
          label: "Out for Delivery",
          color: "bg-purple-100 text-purple-800"
        };
      case 'completed':
        return {
          icon: <CheckCircle className="h-6 w-6 text-green-500" />,
          label: "Completed",
          color: "bg-green-100 text-green-800"
        };
      default:
        return {
          icon: <Clock className="h-6 w-6" />,
          label: "Unknown",
          color: "bg-gray-100 text-gray-800"
        };
    }
  };

  const statusDetails = getStatusDetails();

  return (
    <Card className="mb-4 hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold">{service}</h3>
              <Badge variant="outline" className="text-xs">#{orderId.slice(-4)}</Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-2">{date} • {time}</p>
            {items > 0 && (
              <div className="flex items-center text-xs text-muted-foreground">
                <ShoppingBasket className="h-3 w-3 mr-1" />
                <span>{items} items</span>
              </div>
            )}
          </div>
          <div className="flex flex-col items-end">
            <Badge className={`${statusDetails.color} flex items-center gap-1 mb-2`}>
              {statusDetails.icon}
              <span>{statusDetails.label}</span>
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderStatusCard;
