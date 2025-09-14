import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Shield, FileText, BarChart3, MessageCircle, MapPin } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-accent/5 to-background">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
        <div className="relative container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-hero bg-clip-text text-transparent">
              Municipal Complaint Management System
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Connect with your local government. Report issues, track progress, and help build a better community together.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto mt-12">
              <Card className="shadow-medium hover:shadow-strong transition-smooth cursor-pointer group" 
                    onClick={() => navigate("/citizen-auth")}>
                <CardHeader className="text-center">
                  <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-smooth">
                    <Users className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">I'm a Citizen</CardTitle>
                  <CardDescription>
                    Report issues, track complaints, and stay informed about your community
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full gradient-primary hover:opacity-90 transition-smooth">
                    Get Started
                  </Button>
                </CardContent>
              </Card>

              <Card className="shadow-medium hover:shadow-strong transition-smooth cursor-pointer group"
                    onClick={() => navigate("/admin-auth")}>
                <CardHeader className="text-center">
                  <div className="mx-auto w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-smooth">
                    <Shield className="w-8 h-8 text-accent" />
                  </div>
                  <CardTitle className="text-xl">I'm an Admin</CardTitle>
                  <CardDescription>
                    Manage complaints, oversee departments, and analyze community data
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full border-accent text-accent hover:bg-accent hover:text-accent-foreground transition-smooth">
                    Admin Access
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Powerful Features for Better Governance</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our platform bridges the gap between citizens and local government with modern tools and insights
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="shadow-soft hover:shadow-medium transition-smooth">
              <CardHeader>
                <FileText className="w-10 h-10 text-primary mb-4" />
                <CardTitle>Easy Reporting</CardTitle>
                <CardDescription>
                  Submit complaints with photos, videos, and location data in just a few clicks
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="shadow-soft hover:shadow-medium transition-smooth">
              <CardHeader>
                <MapPin className="w-10 h-10 text-primary mb-4" />
                <CardTitle>Location Mapping</CardTitle>
                <CardDescription>
                  Visual complaint tracking with interactive maps and location-based insights
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="shadow-soft hover:shadow-medium transition-smooth">
              <CardHeader>
                <BarChart3 className="w-10 h-10 text-primary mb-4" />
                <CardTitle>Analytics Dashboard</CardTitle>
                <CardDescription>
                  Comprehensive reporting and analytics for data-driven decision making
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="shadow-soft hover:shadow-medium transition-smooth">
              <CardHeader>
                <MessageCircle className="w-10 h-10 text-primary mb-4" />
                <CardTitle>AI Assistant</CardTitle>
                <CardDescription>
                  Get help navigating the system with our intelligent chatbot guide
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="shadow-soft hover:shadow-medium transition-smooth">
              <CardHeader>
                <Users className="w-10 h-10 text-primary mb-4" />
                <CardTitle>Real-time Updates</CardTitle>
                <CardDescription>
                  Stay informed with instant notifications about your complaint status
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="shadow-soft hover:shadow-medium transition-smooth">
              <CardHeader>
                <Shield className="w-10 h-10 text-primary mb-4" />
                <CardTitle>Secure & Private</CardTitle>
                <CardDescription>
                  Your data is protected with enterprise-grade security and privacy controls
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;