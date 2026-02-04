import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

interface BookSessionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function BookSessionDialog({ open, onOpenChange }: BookSessionDialogProps) {
  const [member, setMember] = useState("");
  const [trainer, setTrainer] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!member || !trainer || !date || !time) {
      toast.error("Please fill in all fields");
      return;
    }
    toast.success(`Session booked for ${member} with ${trainer}!`);
    setMember("");
    setTrainer("");
    setDate("");
    setTime("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Book Session</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="member">Member Name</Label>
            <Input
              id="member"
              value={member}
              onChange={(e) => setMember(e.target.value)}
              placeholder="Search member..."
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="trainer">Trainer</Label>
            <Select value={trainer} onValueChange={setTrainer}>
              <SelectTrigger>
                <SelectValue placeholder="Select trainer" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="John Smith">John Smith</SelectItem>
                <SelectItem value="Sarah Johnson">Sarah Johnson</SelectItem>
                <SelectItem value="Mike Williams">Mike Williams</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="time">Time</Label>
            <Select value={time} onValueChange={setTime}>
              <SelectTrigger>
                <SelectValue placeholder="Select time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="09:00">9:00 AM</SelectItem>
                <SelectItem value="10:00">10:00 AM</SelectItem>
                <SelectItem value="11:00">11:00 AM</SelectItem>
                <SelectItem value="14:00">2:00 PM</SelectItem>
                <SelectItem value="15:00">3:00 PM</SelectItem>
                <SelectItem value="16:00">4:00 PM</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Book Session</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
