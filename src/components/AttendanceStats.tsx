import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, UserCheck, Clock, TrendingUp } from 'lucide-react';

interface AttendanceStatsProps {
  totalStudents: number;
  presentStudents: number;
  sessionDuration: string;
  attendanceRate: number;
}

export const AttendanceStats: React.FC<AttendanceStatsProps> = ({
  totalStudents,
  presentStudents,
  sessionDuration,
  attendanceRate
}) => {
  const stats = [
    {
      title: "Total Students",
      value: totalStudents,
      icon: Users,
      description: "Enrolled in class",
      color: "text-primary"
    },
    {
      title: "Present Today", 
      value: presentStudents,
      icon: UserCheck,
      description: "Detected via beacon",
      color: "text-success"
    },
    {
      title: "Session Time",
      value: sessionDuration,
      icon: Clock,
      description: "Active duration",
      color: "text-warning"
    },
    {
      title: "Attendance Rate",
      value: `${attendanceRate}%`,
      icon: TrendingUp,
      description: "Class participation",
      color: attendanceRate >= 80 ? "text-success" : attendanceRate >= 60 ? "text-warning" : "text-destructive"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className="glass-card shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {stat.title}
            </CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${stat.color} mb-1`}>
              {stat.value}
            </div>
            <p className="text-xs text-muted-foreground">
              {stat.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export const StudentList: React.FC<{ 
  students: Array<{
    id: string;
    name: string;
    rollNumber: string;
    status: 'present' | 'absent' | 'late';
    timestamp?: string;
    rssi?: number;
  }>
}> = ({ students }) => {
  return (
    <Card className="glass-card shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="w-5 h-5" />
          Student Attendance
        </CardTitle>
        <CardDescription>
          Real-time attendance tracking via BLE beacon
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {students.map((student) => (
            <div 
              key={student.id}
              className="flex items-center justify-between p-3 rounded-lg border border-border/50 bg-card/50"
            >
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <div className={`w-3 h-3 rounded-full ${
                    student.status === 'present' 
                      ? 'bg-success signal-bar' 
                      : student.status === 'late'
                      ? 'bg-warning'
                      : 'bg-muted'
                  }`} />
                </div>
                <div>
                  <p className="text-sm font-medium">{student.name}</p>
                  <p className="text-xs text-muted-foreground">{student.rollNumber}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                {student.timestamp && (
                  <span className="text-xs text-muted-foreground">
                    {student.timestamp}
                  </span>
                )}
                {student.rssi && (
                  <span className="text-xs text-muted-foreground">
                    {student.rssi}dBm
                  </span>
                )}
                <Badge 
                  variant={
                    student.status === 'present' 
                      ? 'default' 
                      : student.status === 'late'
                      ? 'secondary'
                      : 'outline'
                  }
                  className="text-xs"
                >
                  {student.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};