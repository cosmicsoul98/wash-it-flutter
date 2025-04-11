
import { Card, CardContent } from "@/components/ui/card";

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  price: string;
  description: string;
  onClick: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ 
  icon, 
  title, 
  price, 
  description, 
  onClick 
}) => {
  return (
    <Card 
      className="service-card cursor-pointer transition-all duration-300 border border-gray-100 hover:border-primary/20"
      onClick={onClick}
    >
      <CardContent className="p-6 flex flex-col items-center text-center">
        <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center mb-4 bubble-animation">
          {icon}
        </div>
        <h3 className="text-lg font-semibold mb-1">{title}</h3>
        <p className="text-primary font-bold mb-2">{price}</p>
        <p className="text-sm text-gray-500">{description}</p>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
