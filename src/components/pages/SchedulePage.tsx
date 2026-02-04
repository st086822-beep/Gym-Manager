import { Calendar, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ScheduleItem {
  id: string;
  title: string;
  trainer: string;
  time: string;
  duration: string;
  spots: number;
  maxSpots: number;
  type: "yoga" | "hiit" | "strength" | "cardio" | "spinning";
}

const schedule: ScheduleItem[] = [
  { id: "1", title: "Morning Yoga", trainer: "Sarah Johnson", time: "06:00 AM", duration: "60 min", spots: 12, maxSpots: 20, type: "yoga" },
  { id: "2", title: "HIIT Blast", trainer: "Mike Williams", time: "07:30 AM", duration: "45 min", spots: 18, maxSpots: 25, type: "hiit" },
  { id: "3", title: "Strength Training", trainer: "John Smith", time: "09:00 AM", duration: "60 min", spots: 8, maxSpots: 15, type: "strength" },
  { id: "4", title: "Spin Class", trainer: "Emily Davis", time: "12:00 PM", duration: "45 min", spots: 20, maxSpots: 20, type: "spinning" },
  { id: "5", title: "Cardio Kickbox", trainer: "Mike Williams", time: "05:30 PM", duration: "60 min", spots: 15, maxSpots: 25, type: "cardio" },
  { id: "6", title: "Evening Yoga", trainer: "Sarah Johnson", time: "07:00 PM", duration: "60 min", spots: 5, maxSpots: 20, type: "yoga" },
];

const typeColors = {
  yoga: "bg-purple-500/10 text-purple-500 border-purple-500/20",
  hiit: "bg-red-500/10 text-red-500 border-red-500/20",
  strength: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  cardio: "bg-orange-500/10 text-orange-500 border-orange-500/20",
  spinning: "bg-green-500/10 text-green-500 border-green-500/20",
};

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export function SchedulePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Schedule</h1>
          <p className="text-muted-foreground mt-1">Manage class schedules and sessions</p>
        </div>
        <Button>
          <Calendar className="w-4 h-4 mr-2" />
          Add Class
        </Button>
      </div>

      {/* Day Selector */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {days.map((day, index) => (
          <Button
            key={day}
            variant={index === 0 ? "default" : "outline"}
            className="min-w-[80px]"
          >
            {day}
          </Button>
        ))}
      </div>

      {/* Schedule Grid */}
      <div className="grid gap-4">
        {schedule.map((item) => (
          <div 
            key={item.id} 
            className="bg-card rounded-xl border p-6 flex items-center justify-between hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-6">
              <div className="text-center min-w-[80px]">
                <p className="text-2xl font-bold text-foreground">{item.time.split(' ')[0]}</p>
                <p className="text-sm text-muted-foreground">{item.time.split(' ')[1]}</p>
              </div>
              <div className="h-12 w-px bg-border" />
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <Badge className={cn("capitalize border", typeColors[item.type])}>
                    {item.type}
                  </Badge>
                </div>
                <p className="text-muted-foreground">{item.trainer}</p>
                <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {item.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {item.spots}/{item.maxSpots} spots
                  </span>
                </div>
              </div>
            </div>
            <Button 
              variant={item.spots >= item.maxSpots ? "outline" : "default"}
              disabled={item.spots >= item.maxSpots}
            >
              {item.spots >= item.maxSpots ? "Full" : "Book Now"}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
