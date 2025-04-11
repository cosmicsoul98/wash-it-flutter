
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

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
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Card 
        className="service-card cursor-pointer overflow-hidden bg-white border-gray-100 hover:border-primary/20 hover:shadow-md"
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
    </motion.div>
  );
};

export default ServiceCard;
