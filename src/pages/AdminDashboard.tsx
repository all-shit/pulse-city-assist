import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  BarChart3, Users, FileText, Clock, CheckCircle, AlertTriangle,
  LogOut, Bell, Settings, Filter, MapPin, TrendingUp, Calendar
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";

const AdminDashboard = () => {
  const navigate = useNavigate();

  // Mock data for charts
  const complaintsByMonth = [
    { month: "Jan", total: 45, resolved: 32, pending: 13 },
    { month: "Feb", total: 52, resolved: 38, pending: 14 },
    { month: "Mar", total: 38, resolved: 29, pending: 9 },
    { month: "Apr", total: 61, resolved: 45, pending: 16 },
    { month: "May", total: 55, resolved: 42, pending: 13 },
    { month: "Jun", total: 49, resolved: 35, pending: 14 }
  ];

  const complaintsByDepartment = [
    { name: "Public Works", value: 120, color: "#3B82F6" },
    { name: "Roads & Traffic", value: 85, color: "#10B981" },
    { name: "Public Safety", value: 65, color: "#F59E0B" },
    { name: "Environment", value: 45, color: "#EF4444" },
    { name: "Building & Safety", value: 35, color: "#8B5CF6" }
  ];

  const resolutionTrends = [
    { week: "Week 1", avgDays: 5.2 },
    { week: "Week 2", avgDays: 4.8 },
    { week: "Week 3", avgDays: 6.1 },
    { week: "Week 4", avgDays: 4.5 }
  ];

  const mockComplaints = [
    {
      id: "C001",
      title: "Broken Streetlight on Main St",
      status: "In Progress",
      date: "2024-01-15",
      department: "Public Works",
      priority: "Medium",
      assignedTo: "John Smith"
    },
    {
      id: "C002", 
      title: "Pothole near City Park",
      status: "Pending Assignment",
      date: "2024-01-20",
      department: "Roads & Traffic",
      priority: "High",
      assignedTo: "-"
    },
    {
      id: "C003",
      title: "Noise Complaint - Construction",
      status: "Under Review",
      date: "2024-01-18",
      department: "Building & Safety",
      priority: "Low",
      assignedTo: "Sarah Johnson"
    }
  ];

  const stats = [
    { title: "Total Complaints", value: "1,247", change: "+12%", icon: FileText, color: "text-primary" },
    { title: "Resolved This Month", value: "89", change: "+8%", icon: CheckCircle, color: "text-success" },
    { title: "Pending Review", value: "23", change: "-15%", icon: Clock, color: "text-warning" },
    { title: "High Priority", value: "7", change: "-2%", icon: AlertTriangle, color: "text-destructive" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Resolved": return "bg-success text-success-foreground";
      case "In Progress": return "bg-warning text-warning-foreground";
      case "Pending Assignment": return "bg-destructive text-destructive-foreground";
      case "Under Review": return "bg-primary text-primary-foreground";
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
            <h1 className="text-2xl font-bold text-primary">Admin Dashboard</h1>
            <Badge className="bg-accent/10 text-accent border-accent/20">
              Municipal Admin
            </Badge>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <Bell className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="w-4 h-4" />
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
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="shadow-medium hover:shadow-strong transition-smooth">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.change} from last month</p>
                  </div>
                  <div className={`p-3 rounded-full bg-muted/50 ${stat.color}`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 gap-1">
            <TabsTrigger value="overview" className="text-xs sm:text-sm">Overview</TabsTrigger>
            <TabsTrigger value="complaints" className="text-xs sm:text-sm">Manage Complaints</TabsTrigger>
            <TabsTrigger value="analytics" className="text-xs sm:text-sm">Analytics</TabsTrigger>
            <TabsTrigger value="map" className="text-xs sm:text-sm">Live Map</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Monthly Complaints Chart */}
              <Card className="shadow-medium">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Monthly Complaints Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={complaintsByMonth}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="total" fill="hsl(var(--primary))" />
                      <Bar dataKey="resolved" fill="hsl(var(--success))" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Department Distribution */}
              <Card className="shadow-medium">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Complaints by Department
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={complaintsByDepartment}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        dataKey="value"
                      >
                        {complaintsByDepartment.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {complaintsByDepartment.map((dept, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: dept.color }}
                        />
                        <span className="text-sm">{dept.name}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Resolution Trends */}
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Average Resolution Time Trend
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={resolutionTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="avgDays" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="complaints" className="space-y-6">
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Complaint Management
                </CardTitle>
                <CardDescription>
                  Review, assign, and update complaint statuses
                </CardDescription>
                <div className="flex gap-4">
                  <Select>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Filter by department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Departments</SelectItem>
                      <SelectItem value="public-works">Public Works</SelectItem>
                      <SelectItem value="roads">Roads & Traffic</SelectItem>
                      <SelectItem value="safety">Public Safety</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  {mockComplaints.map((complaint) => (
                    <Card key={complaint.id} className="border-l-4 border-l-primary">
                      <CardContent className="pt-4">
                        <div className="flex items-start justify-between">
                          <div className="space-y-2 flex-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold">{complaint.title}</h3>
                              <Badge variant="outline">#{complaint.id}</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {complaint.department} • Submitted on {complaint.date}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Assigned to: {complaint.assignedTo}
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
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              Assign
                            </Button>
                            <Button variant="outline" size="sm">
                              Update Status
                            </Button>
                            <Button size="sm" className="gradient-primary">
                              View Details
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="shadow-medium">
                <CardHeader>
                  <CardTitle>Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Average Resolution Time</span>
                    <span className="font-semibold">4.8 days</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Citizen Satisfaction Rate</span>
                    <span className="font-semibold">87%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>First Response Time</span>
                    <span className="font-semibold">2.3 hours</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Resolution Rate</span>
                    <span className="font-semibold">94%</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-medium">
                <CardHeader>
                  <CardTitle>Department Workload</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {complaintsByDepartment.map((dept, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">{dept.name}</span>
                        <span className="text-sm font-medium">{dept.value} complaints</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="h-2 rounded-full transition-all duration-300"
                          style={{ 
                            width: `${(dept.value / 120) * 100}%`,
                            backgroundColor: dept.color 
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="map" className="space-y-6">
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Live Complaint Map
                </CardTitle>
                <CardDescription>
                  Interactive map showing complaint locations and status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-96 bg-muted rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-lg font-medium mb-2">Interactive Map View</p>
                    <p className="text-muted-foreground">
                      Connect to Mapbox or Google Maps API to display complaint locations
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;