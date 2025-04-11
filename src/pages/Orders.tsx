
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OrderStatusCard from "@/components/OrderStatusCard";

interface Order {
  id: string;
  service: string;
  status: 'pending' | 'processing' | 'delivery' | 'completed';
  pickupDate: string;
  pickupTime: string;
  items?: number;
}

const Orders = () => {
  const location = useLocation();
  const [activeOrders, setActiveOrders] = useState<Order[]>([]);
  
  // Dummy data for demo purposes
  const dummyOrders: Order[] = [
    {
      id: "ORD1234",
      service: "Wash & Fold",
      status: "processing",
      pickupDate: "May 10, 2025",
      pickupTime: "14:00",
      items: 5
    },
    {
      id: "ORD5678",
      service: "Dry Cleaning",
      status: "delivery",
      pickupDate: "May 8, 2025",
      pickupTime: "10:00",
      items: 2
    }
  ];
  
  useEffect(() => {
    // Load initial orders
    setActiveOrders(dummyOrders);
    
    // Check if we have a new order from the order form
    const { newOrder } = location.state || {};
    if (newOrder) {
      setActiveOrders(prev => [newOrder, ...prev]);
    }
  }, [location.state]);
  
  // Simulate order status changes every 30 seconds for demo purposes
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveOrders(prev => 
        prev.map(order => {
          // Randomly progress some orders to the next status
          if (Math.random() > 0.7) {
            if (order.status === 'pending') return { ...order, status: 'processing' };
            if (order.status === 'processing') return { ...order, status: 'delivery' };
            if (order.status === 'delivery') return { ...order, status: 'completed' };
          }
          return order;
        })
      );
    }, 30000);
    
    return () => clearInterval(interval);
  }, []);
  
  const pendingOrders = activeOrders.filter(order => 
    order.status === 'pending' || order.status === 'processing' || order.status === 'delivery'
  );
  
  const completedOrders = activeOrders.filter(order => 
    order.status === 'completed'
  );

  return (
    <div className="container mx-auto px-4 pt-16 pb-24 md:pb-4">
      <h1 className="text-2xl font-bold mb-6">Your Orders</h1>
      
      <Tabs defaultValue="active" className="mb-8">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="active">Active ({pendingOrders.length})</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        
        <TabsContent value="active">
          {pendingOrders.length > 0 ? (
            pendingOrders.map(order => (
              <OrderStatusCard
                key={order.id}
                orderId={order.id}
                service={order.service}
                date={order.pickupDate}
                time={order.pickupTime}
                status={order.status}
                items={order.items}
              />
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No active orders</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="completed">
          {completedOrders.length > 0 ? (
            completedOrders.map(order => (
              <OrderStatusCard
                key={order.id}
                orderId={order.id}
                service={order.service}
                date={order.pickupDate}
                time={order.pickupTime}
                status="completed"
                items={order.items}
              />
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No completed orders</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Orders;
