import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Wifi, WifiOff, Radio, Users, Clock, MapPin } from 'lucide-react';
import { toast } from 'sonner';

interface BeaconControlsProps {
  isTeacher?: boolean;
}

export const BeaconControls: React.FC<BeaconControlsProps> = ({ isTeacher = false }) => {
  const [isActive, setIsActive] = useState(false);
  const [connectedDevices, setConnectedDevices] = useState(0);
  const [sessionTime, setSessionTime] = useState(0);
  const [classCode, setClassCode] = useState('CS-2024-001');

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive) {
      interval = setInterval(() => {
        setSessionTime(prev => prev + 1);
        if (isTeacher) {
          // Simulate device connections for demo
          setConnectedDevices(Math.floor(Math.random() * 3) + 15);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, isTeacher]);

  const handleToggleBeacon = () => {
    if (isActive) {
      setIsActive(false);
      setSessionTime(0);
      setConnectedDevices(0);
      toast.success(isTeacher ? "Beacon stopped" : "Scanning stopped");
    } else {
      setIsActive(true);
      toast.success(isTeacher ? "Beacon started - Students can now connect" : "Scanning started - Looking for beacon");
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="glass-card shadow-card">
      <CardHeader className="text-center pb-6">
        <div className="mx-auto mb-4">
          <div className={`relative inline-flex items-center justify-center w-20 h-20 rounded-full ${
            isActive 
              ? 'bg-gradient-primary beacon-active' 
              : 'bg-muted'
          }`}>
            {isActive && (
              <>
                <div className="absolute inset-0 rounded-full bg-primary/20 beacon-ripple"></div>
                <div className="absolute inset-0 rounded-full bg-primary/10 beacon-ripple" style={{ animationDelay: '0.5s' }}></div>
              </>
            )}
            {isActive ? (
              <Radio className="w-8 h-8 text-primary-foreground" />
            ) : (
              <WifiOff className="w-8 h-8 text-muted-foreground" />
            )}
          </div>
        </div>
        <CardTitle className="text-2xl font-bold">
          {isTeacher ? 'Teacher Beacon' : 'Student Scanner'}
        </CardTitle>
        <CardDescription>
          {isTeacher 
            ? 'Broadcast attendance signal to nearby students'
            : 'Scan for teacher beacon to mark attendance'
          }
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="flex justify-center">
          <Button 
            variant={isActive ? "destructive" : "beacon"} 
            size="xl"
            onClick={handleToggleBeacon}
            className="min-w-[200px]"
          >
            {isActive ? (
              <>
                <WifiOff className="w-5 h-5" />
                Stop {isTeacher ? 'Broadcasting' : 'Scanning'}
              </>
            ) : (
              <>
                <Wifi className="w-5 h-5" />
                Start {isTeacher ? 'Broadcasting' : 'Scanning'}
              </>
            )}
          </Button>
        </div>

        {isActive && (
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 rounded-lg bg-gradient-glow">
              <Clock className="w-6 h-6 mx-auto mb-2 text-primary" />
              <p className="text-sm text-muted-foreground mb-1">Session Time</p>
              <p className="text-lg font-bold">{formatTime(sessionTime)}</p>
            </div>
            
            <div className="text-center p-4 rounded-lg bg-gradient-glow">
              {isTeacher ? (
                <>
                  <Users className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <p className="text-sm text-muted-foreground mb-1">Connected</p>
                  <p className="text-lg font-bold">{connectedDevices}</p>
                </>
              ) : (
                <>
                  <MapPin className="w-6 h-6 mx-auto mb-2 text-accent" />
                  <p className="text-sm text-muted-foreground mb-1">Signal Strength</p>
                  <div className="flex justify-center space-x-1">
                    {[1, 2, 3, 4].map((i) => (
                      <div 
                        key={i} 
                        className={`w-1 h-4 rounded signal-bar ${
                          i <= 3 ? 'bg-success' : 'bg-muted'
                        }`}
                        style={{ animationDelay: `${i * 0.2}s` }}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        <div className="flex justify-between items-center p-3 rounded-lg bg-muted/30">
          <span className="text-sm text-muted-foreground">Class Code:</span>
          <Badge variant="secondary" className="font-mono">
            {classCode}
          </Badge>
        </div>

        {isActive && isTeacher && (
          <div className="text-center text-sm text-muted-foreground">
            <p>Broadcasting on BLE UUID: 12345678-1234-5678-1234-56789abcdef0</p>
            <p>Range: ~10 meters • Update interval: 1s</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};