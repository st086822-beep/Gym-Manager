import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

interface AddMemberDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (member: { name: string; email: string; phone: string; plan: string }) => void;
}

export function AddMemberDialog({ open, onOpenChange, onAdd }: AddMemberDialogProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [plan, setPlan] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !plan) {
      toast.error("Please fill in all fields");
      return;
    }
    onAdd({ name, email, phone, plan });
    toast.success(`${name} has been added as a member!`);
    setName("");
    setEmail("");
    setPhone("");
    setPlan("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Member</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="john@example.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+1 234-567-8901"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="plan">Membership Plan</Label>
            <Select value={plan} onValueChange={setPlan}>
              <SelectTrigger>
                <SelectValue placeholder="Select a plan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Basic">Basic - $29/month</SelectItem>
                <SelectItem value="Premium">Premium - $59/month</SelectItem>
                <SelectItem value="VIP">VIP - $99/month</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Member</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
