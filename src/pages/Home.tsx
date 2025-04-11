
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ServiceCard from "@/components/ServiceCard";
import { Tshirt, Droplet, Wind, Siren } from "lucide-react";
import { toast } from "sonner";

const Home = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState('');

  const handleServiceSelect = (service: string) => {
    if (!location) {
      toast.error("Please enter your location first");
      return;
    }
    navigate('/order', { state: { service, location } });
  };

  const handleGetLocation = () => {
    if (navigator.geolocation) {
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

  return (
    <div className="container mx-auto px-4 pt-16 pb-24 md:pb-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2 text-primary">Wash-It</h1>
        <p className="text-gray-600 mb-6">Premium Laundry Services</p>
        
        <Card className="mb-8 bg-gradient-to-r from-primary/10 to-secondary/10 border-none">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-3">Your Location</h2>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter your address"
                className="flex-1 rounded-md border border-input px-3 py-2 text-sm"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              <Button variant="outline" onClick={handleGetLocation}>
                Detect
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Our Services</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <ServiceCard
            icon={<Tshirt size={28} className="text-primary" />}
            title="Wash & Fold"
            price="$1.50/lb"
            description="Clean and neatly folded laundry"
            onClick={() => handleServiceSelect('Wash & Fold')}
          />
          <ServiceCard
            icon={<Droplet size={28} className="text-primary" />}
            title="Dry Cleaning"
            price="$4.99/item"
            description="Professional dry cleaning service"
            onClick={() => handleServiceSelect('Dry Cleaning')}
          />
          <ServiceCard
            icon={<Wind size={28} className="text-primary" />}
            title="Express"
            price="$2.50/lb"
            description="Same day service (before 10 AM)"
            onClick={() => handleServiceSelect('Express')}
          />
          <ServiceCard
            icon={<Siren size={28} className="text-primary" />}
            title="Premium"
            price="$3.99/lb"
            description="Premium care for delicate items"
            onClick={() => handleServiceSelect('Premium')}
          />
        </div>
      </div>

      <div className="mb-8">
        <Card className="bg-accent border-none">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-2">First Order Discount!</h2>
            <p className="text-sm text-gray-600 mb-4">
              Get 15% off on your first order with code: FIRSTWASH
            </p>
            <Button className="w-full" onClick={() => toast.info("Promo code FIRSTWASH will be applied automatically on your first order!")}>
              Learn More
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Home;
