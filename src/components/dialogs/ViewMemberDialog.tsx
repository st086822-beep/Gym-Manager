import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  plan: string;
  status: "active" | "expired" | "pending";
  joinDate: string;
}

interface ViewMemberDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  member: Member | null;
}

const statusStyles = {
  active: "bg-stat-active/10 text-stat-active border-stat-active/20",
  expired: "bg-destructive/10 text-destructive border-destructive/20",
  pending: "bg-stat-new/10 text-stat-new border-stat-new/20",
};

export function ViewMemberDialog({ open, onOpenChange, member }: ViewMemberDialogProps) {
  if (!member) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Member Profile</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-xl font-bold text-primary">
                {member.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div>
              <h3 className="text-lg font-semibold">{member.name}</h3>
              <Badge className={cn("capitalize border", statusStyles[member.status])}>
                {member.status}
              </Badge>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b">
              <span className="text-muted-foreground">Email</span>
              <span className="font-medium">{member.email}</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-muted-foreground">Phone</span>
              <span className="font-medium">{member.phone}</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-muted-foreground">Plan</span>
              <Badge variant="outline">{member.plan}</Badge>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-muted-foreground">Join Date</span>
              <span className="font-medium">
                {new Date(member.joinDate).toLocaleDateString('en-US', { 
                  month: 'long', 
                  day: 'numeric', 
                  year: 'numeric' 
                })}
              </span>
            </div>
          </div>

          <div className="flex gap-2">
            <Button className="flex-1" variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
            <Button className="flex-1">Edit Profile</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
