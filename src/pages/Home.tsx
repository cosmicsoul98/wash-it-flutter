
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import ServiceCard from "@/components/ServiceCard";
import NearbyLaundry from "@/components/NearbyLaundry";
import MiniOrderTracker from "@/components/MiniOrderTracker";
import { Shirt, Droplet, Wind, Siren, MapPin, Search } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

const Home = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Simulated data - in a real app this would come from an API
  const nearbyLaundries = [
    {
      id: "LD1",
      name: "Clean Express",
      rating: 4.8,
      distance: "0.8 miles",
      address: "123 Main St, Anytown, USA",
      openUntil: "9 PM",
      services: ["Wash & Fold", "Dry Cleaning"]
    },
    {
      id: "LD2",
      name: "Fresh & Clean",
      rating: 4.5,
      distance: "1.2 miles",
      address: "456 Oak Ave, Anytown, USA",
      openUntil: "8 PM",
      services: ["Wash & Fold", "Express", "Premium"]
    },
    {
      id: "LD3",
      name: "Sparkle Laundry",
      rating: 4.7,
      distance: "1.5 miles",
      address: "789 Pine St, Anytown, USA",
      openUntil: "10 PM",
      services: ["Wash & Fold", "Dry Cleaning", "Premium"]
    }
  ];
  
  // Simulated active order - this would come from a state management solution in a real app
  const [hasActiveOrder] = useState(true);
  const activeOrder = {
    orderId: "ORD5678",
    status: "processing" as const,
    estimatedTime: "5:30 PM Today"
  };

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleServiceSelect = (service: string) => {
    if (!location) {
      toast.error("Please enter your location first");
      return;
    }
    navigate('/order', { state: { service, location } });
  };

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      toast.info("Detecting your location...");
      navigator.geolocation.getCurrentPosition(
        () => {
          setLocation('Current Location');
          toast.success("Location detected successfully!");
        },
        () => {
          toast.error("Unable to access your location. Please enter it manually.");
        }
      );
    } else {
      toast.error("Geolocation is not supported by your browser");
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className={`container mx-auto px-4 pt-16 pb-24 md:pb-4 transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <div className="flex justify-center mb-3">
          <div className="w-20 h-20 rounded-full bg-gradient-to-r from-primary/80 to-secondary/80 flex items-center justify-center bubble-animation">
            <Shirt size={36} className="text-white" />
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Wash-It</h1>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">Premium Laundry Services at Your Doorstep</p>
        
        <Card className="mb-10 bg-gradient-to-r from-primary/5 to-secondary/5 border-none shadow-sm hover:shadow-md transition-all">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4 text-primary/90">Your Location</h2>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Enter your address"
                  className="pl-10 border-gray-200 focus:border-primary/50"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              <Button 
                onClick={handleGetLocation}
                className="bg-primary hover:bg-primary/90"
              >
                Detect
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      
      {/* Order tracking section */}
      <div className="mb-10">
        <MiniOrderTracker 
          hasActiveOrder={hasActiveOrder}
          orderId={activeOrder.orderId}
          status={activeOrder.status}
          estimatedTime={activeOrder.estimatedTime}
        />
      </div>

      <motion.div 
        className="mb-10"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center md:text-left text-primary/90">Our Services</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <motion.div variants={item}>
            <ServiceCard
              icon={<Shirt size={28} className="text-primary" />}
              title="Wash & Fold"
              price="$1.50/lb"
              description="Clean and neatly folded laundry"
              onClick={() => handleServiceSelect('Wash & Fold')}
            />
          </motion.div>
          <motion.div variants={item}>
            <ServiceCard
              icon={<Droplet size={28} className="text-primary" />}
              title="Dry Cleaning"
              price="$4.99/item"
              description="Professional dry cleaning service"
              onClick={() => handleServiceSelect('Dry Cleaning')}
            />
          </motion.div>
          <motion.div variants={item}>
            <ServiceCard
              icon={<Wind size={28} className="text-primary" />}
              title="Express"
              price="$2.50/lb"
              description="Same day service (before 10 AM)"
              onClick={() => handleServiceSelect('Express')}
            />
          </motion.div>
          <motion.div variants={item}>
            <ServiceCard
              icon={<Siren size={28} className="text-primary" />}
              title="Premium"
              price="$3.99/lb"
              description="Premium care for delicate items"
              onClick={() => handleServiceSelect('Premium')}
            />
          </motion.div>
        </div>
      </motion.div>
      
      {/* Nearby laundries section */}
      <motion.div 
        className="mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-primary/90">Nearby Laundries</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Search laundries"
              className="pl-10 w-[200px] border-gray-200 focus:border-primary/50"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {nearbyLaundries.map((laundry) => (
            <NearbyLaundry
              key={laundry.id}
              id={laundry.id}
              name={laundry.name}
              rating={laundry.rating}
              distance={laundry.distance}
              address={laundry.address}
              openUntil={laundry.openUntil}
              services={laundry.services}
            />
          ))}
        </div>
      </motion.div>

      <motion.div 
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <Card className="bg-gradient-to-r from-accent/80 to-accent/50 border-none shadow-md overflow-hidden relative">
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-secondary/10 rounded-full"></div>
          <div className="absolute -left-10 -bottom-10 w-24 h-24 bg-primary/10 rounded-full"></div>
          <CardContent className="p-8 relative z-10">
            <h2 className="text-xl font-bold mb-2 text-primary">First Order Discount!</h2>
            <p className="text-sm text-gray-700 mb-6">
              Get 15% off on your first order with code: <span className="font-bold text-primary px-2 py-1 bg-white/50 rounded-md">FIRSTWASH</span>
            </p>
            <Button 
              className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity" 
              onClick={() => toast.info("Promo code FIRSTWASH will be applied automatically on your first order!")}
            >
              Claim Offer
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Home;
