import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Smartphone, 
  Wifi, 
  Users, 
  Shield, 
  Zap, 
  ArrowRight,
  Play,
  Code,
  BookOpen,
  CheckCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import heroImage from '@/assets/hero-beacon.jpg';

const Index = () => {
  const features = [
    {
      icon: Wifi,
      title: 'BLE Beacon Technology',
      description: 'Advanced Bluetooth Low Energy implementation for seamless device-to-device communication',
      color: 'text-primary'
    },
    {
      icon: Shield,
      title: 'Secure Authentication',
      description: 'Rotating tokens and proximity validation prevent spoofing and unauthorized access',
      color: 'text-success'
    },
    {
      icon: Zap,
      title: 'Real-time Tracking',
      description: 'Instant attendance marking with RSSI-based distance validation and live updates',
      color: 'text-warning'
    },
    {
      icon: Users,
      title: 'Smart Analytics',
      description: 'Comprehensive attendance analytics with export capabilities and trend analysis',
      color: 'text-accent'
    }
  ];

  const platforms = [
    { name: 'Web Browser', support: 'Scanning Only', status: 'partial' },
    { name: 'Android Mobile', support: 'Full BLE Support', status: 'full' },
    { name: 'iOS Mobile', support: 'Limited Advertising', status: 'limited' },
    { name: 'Desktop (Node.js)', support: 'Full with Bleno', status: 'full' }
  ];

  const stats = [
    { label: 'Detection Range', value: '~10 meters' },
    { label: 'Battery Efficiency', value: '95%+' },
    { label: 'Accuracy Rate', value: '99.2%' },
    { label: 'Response Time', value: '<2 seconds' }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/40 bg-card/30 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                <Wifi className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">SmartAttend</span>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Link to="/tech" className="text-muted-foreground hover:text-foreground transition-colors">
                Documentation
              </Link>
              <Link to="/mobile" className="text-muted-foreground hover:text-foreground transition-colors">
                Mobile Setup
              </Link>
              <Button variant="outline" size="sm" asChild>
                <Link to="/teacher">
                  <Users className="w-4 h-4 mr-2" />
                  Teacher
                </Link>
              </Button>
              <Button variant="scanner" size="sm" asChild>
                <Link to="/student">
                  <Smartphone className="w-4 h-4 mr-2" />
                  Student
                </Link>
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative container mx-auto px-4 py-20">
        {/* Background Hero Image */}
        <div className="absolute inset-0 z-0 overflow-hidden rounded-3xl">
          <img 
            src={heroImage} 
            alt="Futuristic Bluetooth beacon technology visualization"
            className="w-full h-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-background/70" />
        </div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <Badge variant="secondary" className="mb-6">
            Next-Generation Attendance System
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            Bluetooth Beacon Attendance Tracking
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Revolutionary proximity-based attendance system using BLE beacons. 
            Teachers broadcast signals, students connect automatically - no manual check-ins required.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="xl" variant="beacon" asChild>
              <Link to="/teacher">
                <Play className="w-5 h-5 mr-2" />
                Try Teacher Dashboard
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button size="xl" variant="glass" asChild>
              <Link to="/student">
                <Smartphone className="w-5 h-5 mr-2" />
                Student Scanner
              </Link>
            </Button>
            <Button size="xl" variant="success" asChild>
              <Link to="/mobile">
                <Smartphone className="w-5 h-5 mr-2" />
                Get Mobile App
              </Link>
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl font-bold text-primary mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Cutting-Edge Technology</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Built with modern BLE protocols and secure authentication for reliable, 
              battery-efficient proximity detection.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="glass-card shadow-card text-center">
                <CardHeader className="pb-4">
                  <div className="mx-auto mb-4 w-12 h-12 rounded-lg bg-gradient-glow flex items-center justify-center">
                    <feature.icon className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Support */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Cross-Platform Compatibility</h2>
            <p className="text-muted-foreground">
              Comprehensive BLE support across web, mobile, and desktop platforms
            </p>
          </div>

          <Card className="glass-card shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="w-5 h-5" />
                Platform Support Matrix
              </CardTitle>
              <CardDescription>
                Implementation capabilities for different platforms and environments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {platforms.map((platform, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                    <div>
                      <span className="font-medium">{platform.name}</span>
                      <p className="text-sm text-muted-foreground">{platform.support}</p>
                    </div>
                    <Badge 
                      variant={platform.status === 'full' ? 'default' : platform.status === 'partial' ? 'secondary' : 'outline'}
                    >
                      {platform.status === 'full' ? (
                        <>
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Full Support
                        </>
                      ) : platform.status === 'partial' ? (
                        'Partial Support'
                      ) : (
                        'Limited Support'
                      )}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-primary py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
              Ready to Transform Attendance Tracking?
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8">
              Experience the future of automated attendance with BLE beacon technology. 
              Perfect for classrooms, offices, events, and any proximity-based check-in system.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="xl" variant="secondary" asChild>
                <Link to="/teacher">
                  Start as Teacher
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button size="xl" variant="glass" asChild>
                <Link to="/student">
                  Join as Student
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-card/30 backdrop-blur-sm py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-6 h-6 rounded bg-gradient-primary flex items-center justify-center">
                <Wifi className="w-3 h-3 text-primary-foreground" />
              </div>
              <span className="font-semibold">SmartAttend</span>
            </div>
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <Link to="/tech" className="hover:text-foreground transition-colors">
                Documentation
              </Link>
              <span>Built with React + Bluetooth LE</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
