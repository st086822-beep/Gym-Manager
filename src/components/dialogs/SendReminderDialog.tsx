import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

interface SendReminderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SendReminderDialog({ open, onOpenChange }: SendReminderDialogProps) {
  const [audience, setAudience] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!audience || !message) {
      toast.error("Please fill in all fields");
      return;
    }
    toast.success(`Reminder sent to ${audience}!`);
    setAudience("");
    setMessage("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Send Reminder</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="audience">Send To</Label>
            <Select value={audience} onValueChange={setAudience}>
              <SelectTrigger>
                <SelectValue placeholder="Select audience" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Members</SelectItem>
                <SelectItem value="expiring">Expiring This Week</SelectItem>
                <SelectItem value="expired">Expired Members</SelectItem>
                <SelectItem value="inactive">Inactive (30+ days)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter your reminder message..."
              rows={4}
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Send Reminder</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
