import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { StatCard } from "@/components/dashboard/StatCard";
import { MemberTable, Member } from "@/components/dashboard/MemberTable";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { PaymentsPage } from "@/components/pages/PaymentsPage";
import { SchedulePage } from "@/components/pages/SchedulePage";
import { SettingsPage } from "@/components/pages/SettingsPage";
import { AddMemberDialog } from "@/components/dialogs/AddMemberDialog";
import { RecordPaymentDialog } from "@/components/dialogs/RecordPaymentDialog";
import { BookSessionDialog } from "@/components/dialogs/BookSessionDialog";
import { SendReminderDialog } from "@/components/dialogs/SendReminderDialog";
import { Users, UserCheck, DollarSign, UserPlus } from "lucide-react";
import { toast } from "sonner";

const initialMembers: Member[] = [
  { id: "1", name: "Alex Johnson", email: "alex@email.com", phone: "+1 234-567-8901", plan: "Premium", status: "active", joinDate: "2024-01-15" },
  { id: "2", name: "Sarah Williams", email: "sarah@email.com", phone: "+1 234-567-8902", plan: "Basic", status: "active", joinDate: "2024-02-20" },
  { id: "3", name: "Mike Chen", email: "mike@email.com", phone: "+1 234-567-8903", plan: "Premium", status: "expired", joinDate: "2023-11-10" },
  { id: "4", name: "Emily Davis", email: "emily@email.com", phone: "+1 234-567-8904", plan: "Basic", status: "pending", joinDate: "2024-03-01" },
  { id: "5", name: "James Wilson", email: "james@email.com", phone: "+1 234-567-8905", plan: "VIP", status: "active", joinDate: "2023-08-22" },
  { id: "6", name: "Lisa Anderson", email: "lisa@email.com", phone: "+1 234-567-8906", plan: "Premium", status: "active", joinDate: "2024-01-05" },
];

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [members, setMembers] = useState<Member[]>(initialMembers);
  
  // Dialog states
  const [addMemberOpen, setAddMemberOpen] = useState(false);
  const [recordPaymentOpen, setRecordPaymentOpen] = useState(false);
  const [bookSessionOpen, setBookSessionOpen] = useState(false);
  const [sendReminderOpen, setSendReminderOpen] = useState(false);

  const handleAddMember = (memberData: { name: string; email: string; phone: string; plan: string }) => {
    const newMember: Member = {
      id: Date.now().toString(),
      ...memberData,
      status: "active",
      joinDate: new Date().toISOString().split('T')[0],
    };
    setMembers([newMember, ...members]);
  };

  const handleDeleteMember = (id: string) => {
    setMembers(members.filter(m => m.id !== id));
  };

  const handleLogout = () => {
    toast.success("Logged out successfully!");
  };

  const renderContent = () => {
    switch (activeTab) {
      case "payments":
        return <PaymentsPage />;
      case "schedule":
        return <SchedulePage />;
      case "settings":
        return <SettingsPage />;
      case "members":
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Members</h1>
              <p className="text-muted-foreground mt-1">Manage all gym members</p>
            </div>
            <MemberTable
              members={members}
              onAddMember={() => setAddMemberOpen(true)}
              onDeleteMember={handleDeleteMember}
            />
          </div>
        );
      default:
        return (
          <>
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground">
                Welcome back, <span className="text-gradient">Admin</span>
              </h1>
              <p className="text-muted-foreground mt-1">
                Here's what's happening with your gym today.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard
                title="Total Members"
                value={members.length.toLocaleString()}
                icon={Users}
                variant="members"
                trend={{ value: 12.5, positive: true }}
              />
              <StatCard
                title="Active Today"
                value="156"
                icon={UserCheck}
                variant="active"
                subtitle="12% of total members"
              />
              <StatCard
                title="Monthly Revenue"
                value="$48,250"
                icon={DollarSign}
                variant="revenue"
                trend={{ value: 8.2, positive: true }}
              />
              <StatCard
                title="New This Month"
                value="64"
                icon={UserPlus}
                variant="new"
                trend={{ value: 4.1, positive: true }}
              />
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="lg:col-span-2">
                <MemberTable
                  members={members}
                  onAddMember={() => setAddMemberOpen(true)}
                  onDeleteMember={handleDeleteMember}
                />
              </div>
              <div className="space-y-6">
                <QuickActions
                  onNewMember={() => setAddMemberOpen(true)}
                  onRecordPayment={() => setRecordPaymentOpen(true)}
                  onBookSession={() => setBookSessionOpen(true)}
                  onSendReminder={() => setSendReminderOpen(true)}
                />
                <RecentActivity />
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} onLogout={handleLogout} />
      
      <main className="ml-64 p-8">
        {renderContent()}
      </main>

      {/* Dialogs */}
      <AddMemberDialog
        open={addMemberOpen}
        onOpenChange={setAddMemberOpen}
        onAdd={handleAddMember}
      />
      <RecordPaymentDialog
        open={recordPaymentOpen}
        onOpenChange={setRecordPaymentOpen}
      />
      <BookSessionDialog
        open={bookSessionOpen}
        onOpenChange={setBookSessionOpen}
      />
      <SendReminderDialog
        open={sendReminderOpen}
        onOpenChange={setSendReminderOpen}
      />
    </div>
  );
};

export default Index;
