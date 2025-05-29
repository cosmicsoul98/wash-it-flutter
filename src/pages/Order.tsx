import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { format, addDays } from "date-fns";
import { CalendarIcon, Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface LaundryService {
  name: string;
  price: string;
}

interface OrderForm {
  address: string;
  service: string;
  items: number;
  notes: string;
  pickupDate: Date;
  pickupTime: string;
  deliveryDate: Date;
  deliveryTime: string;
}

const Order = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { 
    laundryId, 
    laundryName, 
    laundryServices = [] 
  } = location.state || { 
    laundryId: 'LD1', 
    laundryName: 'Clean Express',
    laundryServices: [
      { name: 'Wash & Fold', price: '$1.50/lb' },
      { name: 'Dry Cleaning', price: '$4.99/item' }
    ]
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<OrderForm>({
    defaultValues: {
      address: '',
      service: '',
      items: 1,
      notes: '',
      pickupDate: new Date(),
      pickupTime: '10:00',
      deliveryDate: addDays(new Date(), 2),
      deliveryTime: '14:00',
    },
  });

  const selectedService = laundryServices.find(s => s.name === form.watch('service'));
  
  const getTotalPrice = () => {
    if (!selectedService) return '0.00';
    
    const items = form.watch('items');
    const priceText = selectedService.price;
    
    // Extract numeric value from price string (e.g., "$1.50/lb" -> 1.50)
    const priceMatch = priceText.match(/\$([0-9.]+)/);
    if (!priceMatch) return '0.00';
    
    const price = parseFloat(priceMatch[1]);
    const total = price * items;
    
    return total.toFixed(2);
  };

  const handleSubmit = (data: OrderForm) => {
    if (!data.service) {
      toast.error("Please select a service");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      
      // Generate random order ID (in real app this would come from backend)
      const orderId = `ORD${Math.floor(Math.random() * 10000)}`;
      
      toast.success("Order placed successfully!");
      
      navigate('/orders', { 
        state: { 
          newOrder: {
            id: orderId,
            service: data.service,
            laundryName,
            status: 'pending',
            pickupDate: format(data.pickupDate, 'MMM dd, yyyy'),
            pickupTime: data.pickupTime,
            items: data.items
          } 
        } 
      });
    }, 1500);
  };

  return (
    <div className="container mx-auto px-4 pt-16 pb-24 md:pb-4">
      <h1 className="text-2xl font-bold mb-6">New Order</h1>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Laundry Provider</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-accent/30 rounded-lg">
                <div>
                  <h3 className="font-semibold">{laundryName}</h3>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                    <span>4.8 • Open until 9 PM</span>
                  </div>
                </div>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  Selected
                </Badge>
              </div>
              
              <FormField
                control={form.control}
                name="service"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select Service</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose a service" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {laundryServices.map((service, index) => (
                          <SelectItem key={index} value={service.name}>
                            <div className="flex justify-between items-center w-full">
                              <span>{service.name}</span>
                              <span className="ml-4 text-muted-foreground">{service.price}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pickup Address</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter your full address" required />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="items"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {selectedService?.price.includes('/lb') ? 'Estimated Weight (lbs)' : 'Number of Items'}
                    </FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        min={1} 
                        {...field} 
                        onChange={(e) => field.onChange(parseInt(e.target.value))} 
                        required 
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Schedule</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">Pickup Details</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="pickupDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Pickup Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) => date < new Date()}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="pickupTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Pickup Time</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select time" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="08:00">8:00 AM</SelectItem>
                            <SelectItem value="10:00">10:00 AM</SelectItem>
                            <SelectItem value="12:00">12:00 PM</SelectItem>
                            <SelectItem value="14:00">2:00 PM</SelectItem>
                            <SelectItem value="16:00">4:00 PM</SelectItem>
                            <SelectItem value="18:00">6:00 PM</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="font-medium">Delivery Details</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="deliveryDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Delivery Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) => {
                                const pickupDate = form.watch('pickupDate');
                                return date < addDays(pickupDate, 1);
                              }}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="deliveryTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Delivery Time</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select time" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="08:00">8:00 AM</SelectItem>
                            <SelectItem value="10:00">10:00 AM</SelectItem>
                            <SelectItem value="12:00">12:00 PM</SelectItem>
                            <SelectItem value="14:00">2:00 PM</SelectItem>
                            <SelectItem value="16:00">4:00 PM</SelectItem>
                            <SelectItem value="18:00">6:00 PM</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Additional Information</CardTitle>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Special Instructions</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Any special instructions or fabric concerns?"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Laundry</span>
                  <span>{laundryName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Service</span>
                  <span>{form.watch('service') || 'Not selected'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    {selectedService?.price.includes('/lb') ? 'Weight' : 'Items'}
                  </span>
                  <span>{form.watch('items')} {selectedService?.price.includes('/lb') ? 'lbs' : 'items'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Unit Price</span>
                  <span>{selectedService?.price || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Pickup</span>
                  <span>
                    {form.watch('pickupDate') && format(form.watch('pickupDate'), 'MMM dd')} - {form.watch('pickupTime')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Delivery</span>
                  <span>
                    {form.watch('deliveryDate') && format(form.watch('deliveryDate'), 'MMM dd')} - {form.watch('deliveryTime')}
                  </span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>${getTotalPrice()}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Processing..." : "Place Order"}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
};

export default Order;
