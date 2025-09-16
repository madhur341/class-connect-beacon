import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TechSpecs } from '@/components/TechSpecs';
import { ArrowLeft, Code, Smartphone, Globe, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const TechDocs: React.FC = () => {
  const platformFeatures = [
    {
      icon: Globe,
      title: 'Web Platform',
      description: 'Browser-based scanning with Web Bluetooth API',
      features: ['BLE device scanning', 'GATT server connections', 'Real-time data exchange', 'Cross-platform compatibility'],
      limitations: ['No advertising support', 'Limited to Chrome/Edge', 'Requires user interaction']
    },
    {
      icon: Smartphone,
      title: 'Mobile Platform', 
      description: 'Native mobile apps with full BLE capabilities',
      features: ['BLE advertising (beacon mode)', 'Background scanning', 'Custom service UUIDs', 'RSSI-based proximity'],
      limitations: ['Platform-specific APIs', 'Battery optimization needed', 'Permissions required']
    },
    {
      icon: Code,
      title: 'Desktop Platform',
      description: 'Node.js applications with system-level access',
      features: ['Noble/Bleno libraries', 'System Bluetooth access', 'Custom protocols', 'Hardware integration'],
      limitations: ['OS-dependent libraries', 'Root/admin access needed', 'Driver compatibility']
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/40 bg-card/30 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Link to="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold">Technical Documentation</h1>
              <p className="text-muted-foreground">BLE Beacon Implementation Guide & API Reference</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Platform Overview */}
          <section>
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Platform Capabilities</h2>
              <p className="text-muted-foreground">
                Understanding BLE implementation across different platforms and their trade-offs.
              </p>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-6">
              {platformFeatures.map((platform, index) => (
                <Card key={index} className="glass-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <platform.icon className="w-5 h-5 text-primary" />
                      {platform.title}
                    </CardTitle>
                    <CardDescription>{platform.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium text-success mb-2 flex items-center gap-1">
                        <Zap className="w-3 h-3" />
                        Capabilities
                      </h4>
                      <ul className="text-sm space-y-1">
                        {platform.features.map((feature, idx) => (
                          <li key={idx} className="text-muted-foreground">• {feature}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-warning mb-2">Limitations</h4>
                      <ul className="text-sm space-y-1">
                        {platform.limitations.map((limitation, idx) => (
                          <li key={idx} className="text-muted-foreground">• {limitation}</li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Detailed Tech Specs */}
          <section>
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Implementation Details</h2>
              <p className="text-muted-foreground">
                Deep dive into code examples, specifications, and resources for building BLE-enabled applications.
              </p>
            </div>
            
            <TechSpecs />
          </section>
        </div>
      </div>
    </div>
  );
};

export default TechDocs;