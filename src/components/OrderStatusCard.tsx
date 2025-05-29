import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Clock, 
  Truck, 
  CheckCircle, 
  ShoppingBasket, 
  Loader,
  Package,
  Store 
} from "lucide-react";

interface OrderStatusCardProps {
  orderId: string;
  service: string;
  laundryName?: string;
  date: string;
  time: string;
  status: 'pending' | 'processing' | 'delivery' | 'completed';
  items?: number;
}

const OrderStatusCard: React.FC<OrderStatusCardProps> = ({
  orderId,
  service,
  laundryName,
  date,
  time,
  status,
  items = 0
}) => {
  const getProgressValue = () => {
    switch (status) {
      case 'pending':
        return 25;
      case 'processing':
        return 50;
      case 'delivery':
        return 75;
      case 'completed':
        return 100;
      default:
        return 0;
    }
  };

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

  const getStatusSteps = () => {
    const steps = [
      { key: 'pending', label: 'Pickup', icon: Clock },
      { key: 'processing', label: 'Processing', icon: Package },
      { key: 'delivery', label: 'Delivery', icon: Truck },
      { key: 'completed', label: 'Complete', icon: CheckCircle }
    ];
    
    return steps.map((step, index) => {
      const isCompleted = getProgressValue() > (index * 25);
      const isCurrent = step.key === status;
      const IconComponent = step.icon;
      
      return (
        <div key={step.key} className="flex flex-col items-center">
          <div className={`w-6 h-6 rounded-full flex items-center justify-center border transition-all ${
            isCompleted || isCurrent 
              ? 'bg-primary border-primary text-white' 
              : 'bg-gray-100 border-gray-300 text-gray-400'
          }`}>
            <IconComponent className="h-3 w-3" />
          </div>
          <span className={`text-xs mt-1 transition-colors ${
            isCompleted || isCurrent ? 'text-primary font-medium' : 'text-gray-400'
          }`}>
            {step.label}
          </span>
        </div>
      );
    });
  };

  const statusDetails = getStatusDetails();

  return (
    <Card className="mb-4 hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold">{service}</h3>
              <Badge variant="outline" className="text-xs">#{orderId.slice(-4)}</Badge>
            </div>
            {laundryName && (
              <div className="flex items-center text-sm text-muted-foreground mb-1">
                <Store className="h-3 w-3 mr-1" />
                <span>{laundryName}</span>
              </div>
            )}
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
        
        {/* Progress Section */}
        <div className="border-t pt-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Progress</span>
            <span className="text-sm text-gray-500">{getProgressValue()}%</span>
          </div>
          <Progress value={getProgressValue()} className="h-2 mb-3" />
          
          {/* Progress Steps */}
          <div className="flex justify-between">
            {getStatusSteps()}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderStatusCard;
