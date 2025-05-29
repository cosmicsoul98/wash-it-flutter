
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Truck, Package, Clock, ChevronRight, CheckCircle } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";

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
          <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all ${
            isCompleted || isCurrent 
              ? 'bg-primary border-primary text-white' 
              : 'bg-gray-100 border-gray-300 text-gray-400'
          }`}>
            <IconComponent className="h-4 w-4" />
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-gradient-to-r from-white to-gray-50 border border-gray-100 shadow-sm hover:shadow-md transition-all">
        <CardContent className="p-5">
          {hasActiveOrder ? (
            <>
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-primary">Your Active Order</h3>
                <Badge variant="outline" className="font-mono">{orderId}</Badge>
              </div>
              
              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Order Progress</span>
                  <span className="text-sm text-gray-500">{getProgressValue()}%</span>
                </div>
                <Progress value={getProgressValue()} className="h-2 mb-3" />
                
                {/* Progress Steps */}
                <div className="flex justify-between">
                  {getStatusSteps()}
                </div>
              </div>
              
              <div className="flex items-center gap-4 mb-4">
                {getStatusIcon()}
                <div className="flex-1">
                  <Badge className={`${getStatusColor()} font-medium mb-1.5`}>
                    {getStatusText()}
                  </Badge>
                  <p className="text-xs text-muted-foreground">Est. arrival: {estimatedTime}</p>
                </div>
              </div>
              
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full border-primary/20 hover:bg-primary/5" 
                onClick={() => navigate('/orders')}
              >
                Track Order <ChevronRight className="h-3.5 w-3.5 ml-1" />
              </Button>
            </>
          ) : (
            <div className="flex flex-col items-center py-3">
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                <Clock className="h-6 w-6 text-gray-400" />
              </div>
              <p className="text-sm text-muted-foreground mb-4">No active orders at the moment</p>
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
    </motion.div>
  );
};

export default MiniOrderTracker;
