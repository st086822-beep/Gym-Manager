import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

export function SettingsPage() {
  const [gymName, setGymName] = useState("FitCore Gym");
  const [email, setEmail] = useState("admin@fitcore.com");
  const [notifications, setNotifications] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);

  const handleSave = () => {
    toast.success("Settings saved successfully!");
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your gym settings and preferences</p>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="mt-6 space-y-6">
          <div className="bg-card rounded-xl border p-6 space-y-6">
            <h2 className="text-lg font-semibold">Gym Information</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="gymName">Gym Name</Label>
                <Input
                  id="gymName"
                  value={gymName}
                  onChange={(e) => setGymName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Contact Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <Button onClick={handleSave}>Save Changes</Button>
          </div>
        </TabsContent>

        <TabsContent value="notifications" className="mt-6 space-y-6">
          <div className="bg-card rounded-xl border p-6 space-y-6">
            <h2 className="text-lg font-semibold">Notification Preferences</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Push Notifications</p>
                  <p className="text-sm text-muted-foreground">Receive push notifications for new members</p>
                </div>
                <Switch checked={notifications} onCheckedChange={setNotifications} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Email Alerts</p>
                  <p className="text-sm text-muted-foreground">Get email alerts for payments and renewals</p>
                </div>
                <Switch checked={emailAlerts} onCheckedChange={setEmailAlerts} />
              </div>
            </div>
            <Button onClick={handleSave}>Save Preferences</Button>
          </div>
        </TabsContent>

        <TabsContent value="billing" className="mt-6 space-y-6">
          <div className="bg-card rounded-xl border p-6 space-y-6">
            <h2 className="text-lg font-semibold">Subscription Plan</h2>
            <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-primary">Pro Plan</p>
                  <p className="text-sm text-muted-foreground">Unlimited members, advanced analytics</p>
                </div>
                <p className="text-2xl font-bold">$49/mo</p>
              </div>
            </div>
            <Button variant="outline">Change Plan</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
