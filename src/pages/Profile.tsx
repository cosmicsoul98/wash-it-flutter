
import { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Bell, 
  CreditCard, 
  HelpCircle, 
  LogOut, 
  Mail, 
  MapPin, 
  Phone, 
  Settings, 
  User 
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

const Profile = () => {
  const [user] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, Anytown, USA"
  });
  
  const [notifications, setNotifications] = useState({
    orderUpdates: true,
    promotions: false,
    serviceChanges: true
  });
  
  const handleLogout = () => {
    toast.info("You've been logged out successfully");
    // In a real app, this would handle the logout logic
  };
  
  const handleSaveChanges = () => {
    toast.success("Profile updated successfully");
  };

  return (
    <div className="container mx-auto px-4 pt-16 pb-24 md:pb-4">
      <div className="flex flex-col items-center justify-center mb-8">
        <Avatar className="h-24 w-24 mb-4">
          <AvatarImage src="" />
          <AvatarFallback className="bg-primary text-xl">
            {user.name.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
        <h1 className="text-2xl font-bold">{user.name}</h1>
        <p className="text-muted-foreground">Premium Member</p>
      </div>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid w-full items-center gap-2">
            <label className="text-sm font-medium">Full Name</label>
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <Input defaultValue={user.name} />
            </div>
          </div>
          
          <div className="grid w-full items-center gap-2">
            <label className="text-sm font-medium">Email</label>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <Input defaultValue={user.email} />
            </div>
          </div>
          
          <div className="grid w-full items-center gap-2">
            <label className="text-sm font-medium">Phone</label>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <Input defaultValue={user.phone} />
            </div>
          </div>
          
          <div className="grid w-full items-center gap-2">
            <label className="text-sm font-medium">Address</label>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <Input defaultValue={user.address} />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </CardFooter>
      </Card>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Notification Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="h-4 w-4 text-muted-foreground" />
              <div className="text-sm">Order Updates</div>
            </div>
            <Switch
              checked={notifications.orderUpdates}
              onCheckedChange={(checked) => 
                setNotifications(prev => ({ ...prev, orderUpdates: checked }))
              }
            />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="h-4 w-4 text-muted-foreground" />
              <div className="text-sm">Promotions & Discounts</div>
            </div>
            <Switch
              checked={notifications.promotions}
              onCheckedChange={(checked) => 
                setNotifications(prev => ({ ...prev, promotions: checked }))
              }
            />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="h-4 w-4 text-muted-foreground" />
              <div className="text-sm">Service Changes</div>
            </div>
            <Switch
              checked={notifications.serviceChanges}
              onCheckedChange={(checked) => 
                setNotifications(prev => ({ ...prev, serviceChanges: checked }))
              }
            />
          </div>
        </CardContent>
      </Card>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Payment Methods</CardTitle>
        </CardHeader>
        <CardContent>
          <Button variant="outline" className="w-full flex items-center justify-center gap-2">
            <CreditCard className="h-4 w-4" />
            <span>Add Payment Method</span>
          </Button>
        </CardContent>
      </Card>
      
      <div className="space-y-4">
        <Button 
          variant="ghost" 
          className="w-full flex items-center justify-start gap-2 text-muted-foreground"
        >
          <Settings className="h-4 w-4" />
          <span>Settings</span>
        </Button>
        
        <Button 
          variant="ghost" 
          className="w-full flex items-center justify-start gap-2 text-muted-foreground"
        >
          <HelpCircle className="h-4 w-4" />
          <span>Help & Support</span>
        </Button>
        
        <Button 
          variant="ghost" 
          className="w-full flex items-center justify-start gap-2 text-destructive"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4" />
          <span>Logout</span>
        </Button>
      </div>
    </div>
  );
};

export default Profile;
