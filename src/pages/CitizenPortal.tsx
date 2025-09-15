import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FileText, Camera, Mic, MapPin, Bell, Search, 
  LogOut, User, Plus, Clock, CheckCircle, AlertCircle 
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ChatBot from "@/components/ChatBot";

const CitizenPortal = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const mockComplaints = [
    {
      id: "C001",
      title: "Broken Streetlight on Main St",
      status: "In Progress",
      date: "2024-01-15",
      department: "Public Works",
      priority: "Medium"
    },
    {
      id: "C002", 
      title: "Pothole near City Park",
      status: "Resolved",
      date: "2024-01-10",
      department: "Roads & Traffic",
      priority: "High"
    },
    {
      id: "C003",
      title: "Noise Complaint - Construction",
      status: "Pending",
      date: "2024-01-20",
      department: "Building & Safety",
      priority: "Low"
    }
  ];

  const handleSubmitComplaint = async () => {
    setIsSubmitting(true);
    
    setTimeout(() => {
      toast({
        title: "Complaint Submitted Successfully!",
        description: "Your complaint ID is C004. You can track its progress anytime.",
      });
      setIsSubmitting(false);
    }, 1500);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Resolved": return "bg-success text-success-foreground";
      case "In Progress": return "bg-warning text-warning-foreground";
      case "Pending": return "bg-muted text-muted-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "bg-destructive text-destructive-foreground";
      case "Medium": return "bg-warning text-warning-foreground";
      case "Low": return "bg-muted text-muted-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card shadow-soft">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-primary">Citizen Portal</h1>
            <Badge className="bg-primary/10 text-primary border-primary/20">
              Welcome, John Doe
            </Badge>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <Bell className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <User className="w-4 h-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate("/")}
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="submit" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="submit">Submit Complaint</TabsTrigger>
            <TabsTrigger value="track">My Complaints</TabsTrigger>
            <TabsTrigger value="search">Search & Browse</TabsTrigger>
          </TabsList>

          <TabsContent value="submit" className="space-y-6">
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="w-5 h-5" />
                  Submit New Complaint
                </CardTitle>
                <CardDescription>
                  Report an issue in your community. Provide as much detail as possible for faster resolution.
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Complaint Title</Label>
                    <Input 
                      id="title" 
                      placeholder="Brief description of the issue"
                      className="transition-smooth"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="roads">Roads & Traffic</SelectItem>
                        <SelectItem value="utilities">Public Utilities</SelectItem>
                        <SelectItem value="safety">Public Safety</SelectItem>
                        <SelectItem value="environment">Environment</SelectItem>
                        <SelectItem value="noise">Noise Complaints</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <div className="flex gap-2">
                      <Input 
                        id="location" 
                        placeholder="Enter address or landmark"
                        className="flex-1"
                      />
                      <Button variant="outline" size="icon">
                        <MapPin className="w-4 h-4" />
                      </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Detailed Description</Label>
                  <Textarea 
                    id="description"
                    placeholder="Provide a detailed description of the issue, including when it started, how it affects you, and any other relevant information..."
                    rows={4}
                    className="transition-smooth"
                  />
                </div>

                <div className="space-y-4">
                  <Label>Attach Media (Optional)</Label>
                  <div className="grid grid-cols-3 gap-4">
                    <Button variant="outline" className="h-20 flex-col">
                      <Camera className="w-6 h-6 mb-2" />
                      Photo
                    </Button>
                    <Button variant="outline" className="h-20 flex-col">
                      <FileText className="w-6 h-6 mb-2" />
                      Video
                    </Button>
                    <Button variant="outline" className="h-20 flex-col">
                      <Mic className="w-6 h-6 mb-2" />
                      Audio
                    </Button>
                  </div>
                </div>

                <Button 
                  onClick={handleSubmitComplaint}
                  className="w-full gradient-primary hover:opacity-90 transition-smooth"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Complaint"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="track" className="space-y-6">
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  My Complaints
                </CardTitle>
                <CardDescription>
                  Track the status and progress of your submitted complaints
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  {mockComplaints.map((complaint) => (
                    <Card key={complaint.id} className="border-l-4 border-l-primary">
                      <CardContent className="pt-4">
                        <div className="flex items-start justify-between">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold">{complaint.title}</h3>
                              <Badge variant="outline">#{complaint.id}</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {complaint.department} • Submitted on {complaint.date}
                            </p>
                            <div className="flex gap-2">
                              <Badge className={getStatusColor(complaint.status)}>
                                {complaint.status}
                              </Badge>
                              <Badge className={getPriorityColor(complaint.priority)}>
                                {complaint.priority} Priority
                              </Badge>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="search" className="space-y-6">
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="w-5 h-5" />
                  Search Complaints
                </CardTitle>
                <CardDescription>
                  Browse and search through community complaints to see what's happening in your area
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex gap-4">
                  <Input 
                    placeholder="Search by location, category, or keywords..."
                    className="flex-1"
                  />
                  <Button>
                    <Search className="w-4 h-4 mr-2" />
                    Search
                  </Button>
                </div>
                
                <div className="text-center py-8 text-muted-foreground">
                  <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Enter search terms to find relevant complaints in your community</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <ChatBot />
    </div>
  );
};

export default CitizenPortal;
