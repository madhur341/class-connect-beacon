import React from 'react';
import { Button } from '@/components/ui/button';
import { MobileSetupGuide } from '@/components/MobileSetupGuide';
import { ArrowLeft, Smartphone } from 'lucide-react';
import { Link } from 'react-router-dom';

const MobileSetup: React.FC = () => {
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
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <Smartphone className="w-6 h-6" />
                Mobile App Setup
              </h1>
              <p className="text-muted-foreground">Convert to native iOS & Android app with full BLE capabilities</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <MobileSetupGuide />
      </div>
    </div>
  );
};

export default MobileSetup;