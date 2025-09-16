import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Code2, 
  Smartphone, 
  Wifi, 
  Shield, 
  Zap, 
  Database,
  ExternalLink,
  Copy,
  CheckCircle
} from 'lucide-react';
import { toast } from 'sonner';

export const TechSpecs: React.FC = () => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(label);
    toast.success(`${label} copied to clipboard`);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const codeExamples = {
    android: `// Android BLE Advertising (Kotlin)
val advertiser = BluetoothAdapter.getDefaultAdapter().bluetoothLeAdvertiser
val settings = AdvertiseSettings.Builder()
    .setAdvertiseMode(AdvertiseSettings.ADVERTISE_MODE_LOW_LATENCY)
    .setTxPowerLevel(AdvertiseSettings.ADVERTISE_TX_POWER_HIGH)
    .setConnectable(false)
    .build()

val data = AdvertiseData.Builder()
    .addServiceUuid(ParcelUuid.fromString("12345678-1234-5678-1234-56789abcdef0"))
    .addServiceData(ParcelUuid.fromString(uuid), classToken.toByteArray())
    .build()

advertiser.startAdvertising(settings, data, callback)`,

    web: `// Web Bluetooth API (JavaScript)
const device = await navigator.bluetooth.requestDevice({
  filters: [{ services: ['battery_service'] }],
  optionalServices: ['device_information']
});

const server = await device.gatt.connect();
const service = await server.getPrimaryService('battery_service');
const characteristic = await service.getCharacteristic('battery_level');
const value = await characteristic.readValue();`,

    reactNative: `// React Native BLE (JavaScript)
import BleAdvertiser from 'react-native-ble-advertiser';
import { BleManager } from 'react-native-ble-plx';

// Advertise
await BleAdvertiser.broadcastUID(
  "12345678-1234-5678-1234-56789abcdef0", 
  "0001"
);

// Scan
manager.startDeviceScan(null, {}, (error, device) => {
  if (device?.serviceUUIDs?.includes(targetUUID)) {
    console.log('Beacon detected:', device.id);
  }
});`
  };

  const techStack = [
    { name: 'React', version: '18.3.1', description: 'UI Framework' },
    { name: 'TypeScript', version: '5.0+', description: 'Type Safety' },
    { name: 'Tailwind CSS', version: '3.4+', description: 'Styling' },
    { name: 'Vite', version: '5.0+', description: 'Build Tool' },
    { name: 'Shadcn/ui', version: 'Latest', description: 'UI Components' }
  ];

  const bleFeatures = [
    { 
      icon: Wifi, 
      title: 'BLE 5.0+ Support',
      description: 'Modern Bluetooth Low Energy with extended range and improved security'
    },
    { 
      icon: Zap, 
      title: 'Low Power Consumption',
      description: 'Optimized for battery life with configurable advertising intervals'
    },
    { 
      icon: Shield, 
      title: 'Secure Tokens',
      description: 'Rotating authentication tokens prevent spoofing and unauthorized access'
    },
    { 
      icon: Database, 
      title: 'Real-time Analytics',
      description: 'Live attendance tracking with RSSI-based proximity detection'
    }
  ];

  return (
    <div className="space-y-6">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="implementation">Implementation</TabsTrigger>
          <TabsTrigger value="specs">Tech Specs</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            {bleFeatures.map((feature, index) => (
              <Card key={index} className="glass-card">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <feature.icon className="w-5 h-5 text-primary" />
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="implementation" className="space-y-4">
          <div className="space-y-4">
            {Object.entries(codeExamples).map(([platform, code]) => (
              <Card key={platform} className="glass-card">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Code2 className="w-5 h-5" />
                      {platform === 'reactNative' ? 'React Native' : platform.charAt(0).toUpperCase() + platform.slice(1)}
                    </CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(code, platform)}
                    >
                      {copiedCode === platform ? (
                        <CheckCircle className="w-4 h-4 text-success" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <pre className="text-xs bg-muted/30 p-4 rounded-lg overflow-x-auto">
                    <code>{code}</code>
                  </pre>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="specs" className="space-y-4">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Technology Stack</CardTitle>
              <CardDescription>
                Modern web technologies powering this demonstration
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {techStack.map((tech, index) => (
                  <div key={index} className="p-3 rounded-lg bg-muted/30">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{tech.name}</span>
                      <Badge variant="secondary" className="text-xs">
                        {tech.version}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{tech.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle>BLE Protocol Specifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Advertising Parameters</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Service UUID: Custom 128-bit identifier</li>
                    <li>• Advertising Interval: 100ms - 1000ms</li>
                    <li>• TX Power: -40dBm to +4dBm</li>
                    <li>• Payload Size: ≤31 bytes (legacy) / ≤255 bytes (extended)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Security Features</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Rotating session tokens (5-15 minutes)</li>
                    <li>• RSSI-based proximity validation</li>
                    <li>• Encrypted service data payload</li>
                    <li>• Server-side token verification</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resources" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ExternalLink className="w-5 h-5" />
                  Documentation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start" asChild>
                  <a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Bluetooth_API" target="_blank">
                    Web Bluetooth API Docs
                  </a>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <a href="https://developer.android.com/guide/topics/connectivity/bluetooth/ble-overview" target="_blank">
                    Android BLE Guide
                  </a>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <a href="https://developer.apple.com/documentation/corebluetooth" target="_blank">
                    iOS Core Bluetooth
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Smartphone className="w-5 h-5" />
                  Mobile Implementation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start" asChild>
                  <a href="https://github.com/dotintent/react-native-ble-plx" target="_blank">
                    React Native BLE PLX
                  </a>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <a href="https://github.com/vvmspace/react-native-ble-advertiser" target="_blank">
                    React Native BLE Advertiser
                  </a>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <a href="https://github.com/abandonware/noble" target="_blank">
                    Node.js Noble (Scanning)
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};