
import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  CheckCircle, 
  Receipt, 
  Star, 
  ChevronRight 
} from "lucide-react";

interface HistoryOrder {
  id: string;
  service: string;
  date: string;
  items: number;
  total: string;
  rated: boolean;
}

const History = () => {
  const [orders] = useState<HistoryOrder[]>([
    {
      id: "ORD9012",
      service: "Wash & Fold",
      date: "Apr 22, 2025",
      items: 8,
      total: "$12.00",
      rated: true
    },
    {
      id: "ORD7654",
      service: "Dry Cleaning",
      date: "Apr 15, 2025",
      items: 3,
      total: "$14.97",
      rated: false
    },
    {
      id: "ORD3210",
      service: "Express",
      date: "Apr 8, 2025",
      items: 5,
      total: "$12.50",
      rated: true
    },
    {
      id: "ORD1122",
      service: "Premium",
      date: "Mar 30, 2025",
      items: 2,
      total: "$7.98",
      rated: true
    }
  ]);
  
  const [ratings, setRatings] = useState<Record<string, number>>({
    ORD9012: 5,
    ORD3210: 4,
    ORD1122: 5
  });
  
  const handleRate = (orderId: string, rating: number) => {
    setRatings(prev => ({
      ...prev,
      [orderId]: rating
    }));
  };

  return (
    <div className="container mx-auto px-4 pt-16 pb-24 md:pb-4">
      <h1 className="text-2xl font-bold mb-6">Order History</h1>
      
      {orders.map(order => (
        <Card key={order.id} className="mb-4">
          <CardContent className="p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">{order.service}</h3>
                  <Badge variant="outline" className="text-xs">#{order.id.slice(-4)}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{order.date}</p>
              </div>
              <Badge className="bg-green-100 text-green-800 flex items-center gap-1">
                <CheckCircle className="h-3 w-3" />
                <span>Completed</span>
              </Badge>
            </div>
            
            <div className="flex items-center justify-between mt-4 text-sm">
              <div className="flex items-center">
                <Receipt className="h-4 w-4 mr-1 text-muted-foreground" />
                <span>{order.items} items</span>
              </div>
              <span className="font-medium">{order.total}</span>
            </div>
            
            <Separator className="my-3" />
            
            {order.rated ? (
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">Your rating:</div>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map(star => (
                    <Star
                      key={star}
                      className={`h-5 w-5 ${
                        star <= (ratings[order.id] || 0) 
                          ? "text-yellow-400 fill-yellow-400" 
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex justify-between items-center">
                <div className="text-sm text-muted-foreground">Rate this service:</div>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map(star => (
                    <Star
                      key={star}
                      className={`h-5 w-5 cursor-pointer ${
                        star <= (ratings[order.id] || 0) 
                          ? "text-yellow-400 fill-yellow-400" 
                          : "text-gray-300"
                      }`}
                      onClick={() => handleRate(order.id, star)}
                    />
                  ))}
                </div>
              </div>
            )}
            
            <div className="mt-4">
              <Button variant="ghost" className="w-full text-primary flex items-center justify-center">
                <span>View Details</span>
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default History;
