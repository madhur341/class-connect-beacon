import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Bluetooth, AlertCircle, Smartphone, Laptop } from 'lucide-react';
import { toast } from 'sonner';

export const WebBluetoothDemo: React.FC = () => {
  const [isSupported, setIsSupported] = useState(() => {
    if (typeof window === 'undefined') return false;
    return 'bluetooth' in navigator && typeof (navigator as any).bluetooth !== 'undefined';
  });
  const [isConnected, setIsConnected] = useState(false);
  const [deviceInfo, setDeviceInfo] = useState<{ name?: string; id?: string } | null>(null);

  const connectToDevice = async () => {
    if (!isSupported) {
      toast.error('Web Bluetooth is not supported in this browser');
      return;
    }

    try {
      // Request a Bluetooth device with battery service (common service for demo)
      const device = await (navigator as any).bluetooth.requestDevice({
        filters: [{ services: ['battery_service'] }],
        optionalServices: ['device_information']
      });

      setDeviceInfo({
        name: device.name || 'Unknown Device',
        id: device.id
      });

      // Connect to GATT server
      const server = await device.gatt?.connect();
      setIsConnected(true);
      toast.success(`Connected to ${device.name}`);

      // Listen for disconnection
      device.addEventListener('gattserverdisconnected', () => {
        setIsConnected(false);
        toast.info('Device disconnected');
      });

    } catch (error) {
      console.error('Bluetooth connection failed:', error);
      toast.error('Failed to connect to Bluetooth device');
    }
  };

  const simulateBeaconDetection = () => {
    const mockBeacons = [
      { name: 'Teacher Beacon CS101', rssi: -45, uuid: '12345678-1234-5678-1234-56789abcdef0' },
      { name: 'Lab Equipment #3', rssi: -62, uuid: 'fedcba98-7654-3210-fedc-ba9876543210' },
      { name: 'Smart Board', rssi: -38, uuid: 'a1b2c3d4-e5f6-7890-1234-567890abcdef' }
    ];
    
    const detected = mockBeacons[Math.floor(Math.random() * mockBeacons.length)];
    toast.success(`Beacon detected: ${detected.name} (${detected.rssi}dBm)`);
  };

  return (
    <div className="space-y-6">
      <Alert className={isSupported ? "border-success/50 bg-success/5" : "border-warning/50 bg-warning/5"}>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          {isSupported ? (
            <>
              <strong>Web Bluetooth supported!</strong> You can scan for and connect to BLE devices.
              Note: Advertising (beacon mode) is not supported in browsers.
            </>
          ) : (
            <>
              <strong>Web Bluetooth not supported</strong> in this browser. 
              Try Chrome/Edge on desktop or Android.
            </>
          )}
        </AlertDescription>
      </Alert>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bluetooth className="w-5 h-5 text-primary" />
              Real BLE Connection
            </CardTitle>
            <CardDescription>
              Connect to actual Bluetooth Low Energy devices nearby
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              onClick={connectToDevice}
              disabled={!isSupported}
              variant={isConnected ? "success" : "scanner"}
              className="w-full"
            >
              {isConnected ? 'Connected' : 'Scan & Connect'}
            </Button>

            {deviceInfo && (
              <div className="p-3 rounded-lg bg-muted/30 space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Device:</span>
                  <span className="font-medium">{deviceInfo.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Status:</span>
                  <Badge variant={isConnected ? "default" : "outline"}>
                    {isConnected ? 'Connected' : 'Disconnected'}
                  </Badge>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-accent" />
              Beacon Simulation
            </CardTitle>
            <CardDescription>
              Simulate beacon detection for demo purposes
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              onClick={simulateBeaconDetection}
              variant="glass"
              className="w-full"
            >
              Simulate Beacon Detection
            </Button>
            
            <div className="text-sm text-muted-foreground text-center">
              <p>In a real implementation:</p>
              <div className="flex items-center justify-center gap-4 mt-2">
                <div className="flex items-center gap-2">
                  <Smartphone className="w-4 h-4" />
                  <span>Mobile app</span>
                </div>
                <span>↔</span>
                <div className="flex items-center gap-2">
                  <Laptop className="w-4 h-4" />
                  <span>Web dashboard</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};