import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Shield, Mail, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminAuth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    
    // Simulate authentication
    setTimeout(() => {
      toast({
        title: "Admin Login Successful!",
        description: "Welcome to the Administrative Dashboard",
      });
      navigate("/admin");
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent/5 via-background to-primary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/")}
          className="mb-6 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <Card className="shadow-strong">
          <CardHeader className="text-center space-y-2">
            <div className="mx-auto w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-4">
              <Shield className="w-8 h-8 text-accent" />
            </div>
            <CardTitle className="text-2xl">Admin Portal</CardTitle>
            <CardDescription>
              Secure access for municipal administrators and department heads
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="adminEmail">Admin Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="adminEmail" 
                  type="email" 
                  placeholder="admin@municipality.gov"
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="adminPassword">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="adminPassword" 
                  type="password" 
                  placeholder="••••••••"
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="text-sm text-muted-foreground">
              <p>Demo credentials:</p>
              <p>Email: admin@demo.gov</p>
              <p>Password: demo123</p>
            </div>
            
            <Button 
              onClick={handleLogin}
              className="w-full gradient-success hover:opacity-90 transition-smooth"
              disabled={isLoading}
            >
              {isLoading ? "Authenticating..." : "Admin Sign In"}
            </Button>
            
            <div className="text-center text-sm text-muted-foreground">
              Need access? Contact your system administrator
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminAuth;