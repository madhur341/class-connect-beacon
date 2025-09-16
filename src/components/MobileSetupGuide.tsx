import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Smartphone, 
  Download, 
  Settings, 
  Terminal, 
  CheckCircle,
  ExternalLink,
  Github,
  Play
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export const MobileSetupGuide: React.FC = () => {
  const steps = [
    {
      step: 1,
      title: 'Export to GitHub',
      description: 'Transfer your project to GitHub repository',
      action: 'Click "Export to GitHub" button in top-right',
      icon: Github
    },
    {
      step: 2,
      title: 'Clone & Install',
      description: 'Pull the project locally and install dependencies',
      action: 'git pull && npm install',
      icon: Download
    },
    {
      step: 3,
      title: 'Add Native Platforms',
      description: 'Add iOS and/or Android platforms',
      action: 'npx cap add android && npx cap add ios',
      icon: Smartphone
    },
    {
      step: 4,
      title: 'Build & Sync',
      description: 'Build the web app and sync to native platforms',
      action: 'npm run build && npx cap sync',
      icon: Settings
    },
    {
      step: 5,
      title: 'Run on Device',
      description: 'Launch on emulator or physical device',
      action: 'npx cap run android (or ios)',
      icon: Play
    }
  ];

  const requirements = [
    {
      platform: 'Android',
      requirements: ['Android Studio', 'Java JDK 17+', 'Android SDK'],
      optional: 'Physical Android device (recommended)'
    },
    {
      platform: 'iOS',
      requirements: ['macOS', 'Xcode 14+', 'iOS Simulator'],
      optional: 'Apple Developer Account (for physical device)'
    }
  ];

  return (
    <div className="space-y-6">
      <Alert className="border-primary/50 bg-primary/5">
        <Smartphone className="h-4 w-4" />
        <AlertDescription>
          <strong>Ready for mobile deployment!</strong> Your app is configured with Capacitor 
          for native iOS and Android development. Follow the steps below to run on real devices.
        </AlertDescription>
      </Alert>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Setup Steps */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Terminal className="w-5 h-5" />
              Setup Steps
            </CardTitle>
            <CardDescription>
              Convert this web app to native mobile app
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {steps.map((step) => (
                <div key={step.step} className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-sm font-bold text-primary">{step.step}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <step.icon className="w-4 h-4 text-primary" />
                      <h4 className="font-medium text-sm">{step.title}</h4>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">{step.description}</p>
                    <code className="text-xs bg-muted/30 px-2 py-1 rounded">{step.action}</code>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Requirements */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Development Requirements
            </CardTitle>
            <CardDescription>
              Tools needed for mobile development
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {requirements.map((req) => (
                <div key={req.platform}>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary" className="text-xs">
                      {req.platform}
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    {req.requirements.map((item, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-3 h-3 text-success" />
                        <span>{item}</span>
                      </div>
                    ))}
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-3 h-3 rounded-full border border-muted-foreground/50" />
                      <span>{req.optional}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Native Features */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Native BLE Features Available</CardTitle>
          <CardDescription>
            What you'll get when running as a mobile app
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: 'BLE Advertising', desc: 'Teacher phones broadcast beacon signals' },
              { title: 'Background Scanning', desc: 'Detect beacons even when app is minimized' },
              { title: 'RSSI Proximity', desc: 'Distance-based attendance validation' },
              { title: 'Push Notifications', desc: 'Instant attendance confirmations' }
            ].map((feature, index) => (
              <div key={index} className="text-center p-3 rounded-lg bg-gradient-glow">
                <div className="w-8 h-8 mx-auto mb-2 bg-primary/20 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-primary" />
                </div>
                <h4 className="font-medium text-sm mb-1">{feature.title}</h4>
                <p className="text-xs text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Documentation Link */}
      <Card className="glass-card border-primary/50">
        <CardContent className="pt-6">
          <div className="text-center">
            <h3 className="font-semibold mb-2">Need Help with Mobile Setup?</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Check out our comprehensive guide for running Capacitor apps on physical devices.
            </p>
            <Button variant="outline" size="sm" asChild>
              <a href="https://lovable.dev/blogs" target="_blank" className="inline-flex items-center gap-2">
                <ExternalLink className="w-4 h-4" />
                Read Mobile Development Guide
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};