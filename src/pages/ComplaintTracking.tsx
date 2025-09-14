import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Search, Clock, CheckCircle, AlertCircle, FileText } from "lucide-react";

const ComplaintTracking = () => {
  const navigate = useNavigate();
  const [trackingId, setTrackingId] = useState("");
  const [complaint, setComplaint] = useState(null);

  const mockComplaint = {
    id: "C001",
    title: "Broken Streetlight on Main St",
    description: "The streetlight at the intersection of Main St and Oak Ave has been broken for over a week. This creates a safety hazard for pedestrians and drivers, especially during evening hours.",
    status: "In Progress",
    priority: "Medium",
    department: "Public Works",
    submittedDate: "2024-01-15",
    lastUpdated: "2024-01-18",
    assignedTo: "John Smith",
    estimatedCompletion: "2024-01-25",
    location: "Main St & Oak Ave Intersection",
    timeline: [
      {
        date: "2024-01-15",
        status: "Submitted",
        description: "Complaint received and logged into system",
        time: "09:30 AM"
      },
      {
        date: "2024-01-16",
        status: "Under Review",
        description: "Complaint reviewed by Public Works department",
        time: "02:15 PM"
      },
      {
        date: "2024-01-17",
        status: "Assigned",
        description: "Assigned to maintenance team for inspection",
        time: "10:45 AM"
      },
      {
        date: "2024-01-18",
        status: "In Progress",
        description: "Field inspection completed. Parts ordered for repair",
        time: "03:20 PM"
      }
    ]
  };

  const handleTrack = () => {
    if (trackingId.trim()) {
      setComplaint(mockComplaint);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Resolved": return "bg-success text-success-foreground";
      case "In Progress": return "bg-warning text-warning-foreground";
      case "Under Review": return "bg-primary text-primary-foreground";
      case "Assigned": return "bg-accent text-accent-foreground";
      case "Submitted": return "bg-muted text-muted-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Resolved": return CheckCircle;
      case "In Progress": return Clock;
      case "Under Review": return AlertCircle;
      case "Assigned": return FileText;
      default: return Clock;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card shadow-soft">
        <div className="container mx-auto px-4 py-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/")}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          <h1 className="text-2xl font-bold text-primary">Track Your Complaint</h1>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Search Section */}
        <Card className="shadow-medium mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="w-5 h-5" />
              Enter Your Complaint ID
            </CardTitle>
            <CardDescription>
              Enter your complaint tracking ID to view the current status and progress
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 max-w-md">
              <Input 
                placeholder="Enter complaint ID (e.g., C001)"
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                className="flex-1"
              />
              <Button onClick={handleTrack} className="gradient-primary">
                <Search className="w-4 h-4 mr-2" />
                Track
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Complaint Details */}
        {complaint && (
          <div className="space-y-6">
            {/* Basic Info */}
            <Card className="shadow-medium">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {complaint.title}
                      <Badge variant="outline">#{complaint.id}</Badge>
                    </CardTitle>
                    <CardDescription className="mt-2">
                      {complaint.description}
                    </CardDescription>
                  </div>
                  <Badge className={getStatusColor(complaint.status)}>
                    {complaint.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Department</p>
                    <p className="font-medium">{complaint.department}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Priority</p>
                    <Badge className="mt-1 bg-warning text-warning-foreground">
                      {complaint.priority}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Assigned To</p>
                    <p className="font-medium">{complaint.assignedTo}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Expected Resolution</p>
                    <p className="font-medium">{complaint.estimatedCompletion}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Progress Timeline
                </CardTitle>
                <CardDescription>
                  Track the progress of your complaint from submission to resolution
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {complaint.timeline.map((event, index) => {
                    const StatusIcon = getStatusIcon(event.status);
                    const isCompleted = index < complaint.timeline.length - 1 || event.status === "Resolved";
                    
                    return (
                      <div key={index} className="flex items-start gap-4">
                        <div className="flex flex-col items-center">
                          <div className={`p-2 rounded-full ${isCompleted ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                            <StatusIcon className="w-4 h-4" />
                          </div>
                          {index < complaint.timeline.length - 1 && (
                            <div className={`w-px h-8 mt-2 ${isCompleted ? 'bg-primary' : 'bg-muted'}`} />
                          )}
                        </div>
                        <div className="flex-1 pb-4">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge className={getStatusColor(event.status)}>
                              {event.status}
                            </Badge>
                            <span className="text-sm text-muted-foreground">
                              {event.date} at {event.time}
                            </span>
                          </div>
                          <p className="text-sm">{event.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Additional Info */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="shadow-medium">
                <CardHeader>
                  <CardTitle>Location Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-2">Reported Location:</p>
                  <p className="font-medium">{complaint.location}</p>
                  <div className="mt-4 h-32 bg-muted rounded-lg flex items-center justify-center">
                    <p className="text-muted-foreground">Map placeholder</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-medium">
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Department Contact</p>
                    <p className="font-medium">Public Works Department</p>
                    <p className="text-sm text-muted-foreground">publicworks@municipality.gov</p>
                    <p className="text-sm text-muted-foreground">(555) 123-4567</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Assigned Technician</p>
                    <p className="font-medium">{complaint.assignedTo}</p>
                    <p className="text-sm text-muted-foreground">j.smith@municipality.gov</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Demo Info */}
        {!complaint && (
          <Card className="shadow-soft">
            <CardContent className="pt-6 text-center">
              <p className="text-muted-foreground mb-4">
                This is a demo system. Try tracking complaint ID: <strong>C001</strong>
              </p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setTrackingId("C001");
                  setComplaint(mockComplaint);
                }}
              >
                Try Demo
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ComplaintTracking;