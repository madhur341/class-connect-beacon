import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BeaconControls } from '@/components/BeaconControls';
import { AttendanceStats, StudentList } from '@/components/AttendanceStats';
import { ArrowLeft, Download, RefreshCw, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

const TeacherDashboard: React.FC = () => {
  const [students] = useState([
    { id: '1', name: 'Alice Johnson', rollNumber: 'CS2021001', status: 'present' as const, timestamp: '09:15 AM', rssi: -42 },
    { id: '2', name: 'Bob Smith', rollNumber: 'CS2021002', status: 'present' as const, timestamp: '09:16 AM', rssi: -38 },
    { id: '3', name: 'Charlie Brown', rollNumber: 'CS2021003', status: 'late' as const, timestamp: '09:25 AM', rssi: -55 },
    { id: '4', name: 'Diana Prince', rollNumber: 'CS2021004', status: 'present' as const, timestamp: '09:14 AM', rssi: -45 },
    { id: '5', name: 'Edward Wilson', rollNumber: 'CS2021005', status: 'absent' as const },
    { id: '6', name: 'Fiona Davis', rollNumber: 'CS2021006', status: 'present' as const, timestamp: '09:13 AM', rssi: -41 }
  ]);

  const totalStudents = students.length;
  const presentStudents = students.filter(s => s.status === 'present' || s.status === 'late').length;
  const attendanceRate = Math.round((presentStudents / totalStudents) * 100);
  
  const [sessionTime, setSessionTime] = useState('15:32');

  const exportAttendance = () => {
    const data = students.map(s => ({
      name: s.name,
      rollNumber: s.rollNumber,
      status: s.status,
      timestamp: s.timestamp || 'N/A'
    }));
    
    const csv = [
      ['Name', 'Roll Number', 'Status', 'Timestamp'],
      ...data.map(row => [row.name, row.rollNumber, row.status, row.timestamp])
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `attendance-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/40 bg-card/30 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold">Teacher Dashboard</h1>
                <p className="text-muted-foreground">Computer Science 101 - Advanced Programming</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm">
                <RefreshCw className="w-4 h-4" />
              </Button>
              <Button onClick={exportAttendance} variant="secondary" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Beacon Controls */}
          <div className="lg:col-span-1">
            <BeaconControls isTeacher={true} />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Stats */}
            <AttendanceStats 
              totalStudents={totalStudents}
              presentStudents={presentStudents}
              sessionDuration={sessionTime}
              attendanceRate={attendanceRate}
            />

            {/* Student List */}
            <StudentList students={students} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;