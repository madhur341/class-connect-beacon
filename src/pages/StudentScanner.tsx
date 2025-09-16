import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BeaconControls } from '@/components/BeaconControls';
import { WebBluetoothDemo } from '@/components/WebBluetoothDemo';
import { ArrowLeft, CheckCircle, Clock, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

const StudentScanner: React.FC = () => {
  const [attendanceStatus, setAttendanceStatus] = useState<'not_marked' | 'pending' | 'confirmed'>('not_marked');
  const [studentInfo] = useState({
    name: 'John Doe',
    rollNumber: 'CS2021007',
    class: 'Computer Science 101'
  });

  const mockMarkAttendance = () => {
    setAttendanceStatus('pending');
    setTimeout(() => {
      setAttendanceStatus('confirmed');
    }, 2000);
  };

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
              <h1 className="text-2xl font-bold">Student Scanner</h1>
              <p className="text-muted-foreground">Scan for teacher beacon to mark attendance</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Student Info & Controls */}
          <div className="space-y-6">
            {/* Student Profile */}
            <Card className="glass-card shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-bold">
                    {studentInfo.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  Student Profile
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Name:</span>
                  <span className="font-medium">{studentInfo.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Roll Number:</span>
                  <span className="font-mono">{studentInfo.rollNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Class:</span>
                  <span className="font-medium">{studentInfo.class}</span>
                </div>
              </CardContent>
            </Card>

            {/* Attendance Status */}
            <Card className="glass-card shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {attendanceStatus === 'confirmed' ? (
                    <CheckCircle className="w-5 h-5 text-success" />
                  ) : attendanceStatus === 'pending' ? (
                    <Clock className="w-5 h-5 text-warning animate-pulse" />
                  ) : (
                    <MapPin className="w-5 h-5 text-muted-foreground" />
                  )}
                  Attendance Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-4">
                  <Badge 
                    variant={
                      attendanceStatus === 'confirmed' ? 'default' :
                      attendanceStatus === 'pending' ? 'secondary' : 'outline'
                    }
                    className="px-4 py-2 text-sm"
                  >
                    {attendanceStatus === 'confirmed' ? 'Attendance Confirmed' :
                     attendanceStatus === 'pending' ? 'Verifying...' : 'Not Marked'}
                  </Badge>
                  
                  {attendanceStatus === 'confirmed' && (
                    <div className="text-sm text-muted-foreground">
                      <p>Marked present at 09:18 AM</p>
                      <p>Location verified via beacon signal</p>
                    </div>
                  )}

                  {attendanceStatus === 'not_marked' && (
                    <Button 
                      onClick={mockMarkAttendance}
                      variant="scanner" 
                      className="w-full"
                    >
                      Simulate Attendance Marking
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Beacon Scanner */}
            <BeaconControls isTeacher={false} />
          </div>

          {/* Web Bluetooth Demo */}
          <div>
            <Card className="glass-card shadow-card">
              <CardHeader>
                <CardTitle>Web Bluetooth Integration</CardTitle>
                <CardDescription>
                  Experience real Bluetooth functionality in your browser
                </CardDescription>
              </CardHeader>
              <CardContent>
                <WebBluetoothDemo />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentScanner;