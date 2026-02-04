import { Search, MoreVertical, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ViewMemberDialog } from "@/components/dialogs/ViewMemberDialog";
import { DeleteMemberDialog } from "@/components/dialogs/DeleteMemberDialog";
import { toast } from "sonner";

export interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  plan: string;
  status: "active" | "expired" | "pending";
  joinDate: string;
}

interface MemberTableProps {
  members: Member[];
  onAddMember: () => void;
  onDeleteMember: (id: string) => void;
}

const statusStyles = {
  active: "bg-stat-active/10 text-stat-active border-stat-active/20",
  expired: "bg-destructive/10 text-destructive border-destructive/20",
  pending: "bg-stat-new/10 text-stat-new border-stat-new/20",
};

export function MemberTable({ members, onAddMember, onDeleteMember }: MemberTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMember, setViewMember] = useState<Member | null>(null);
  const [deleteMember, setDeleteMember] = useState<Member | null>(null);

  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRenew = (member: Member) => {
    toast.success(`Membership renewed for ${member.name}!`);
  };

  return (
    <>
      <div className="bg-card rounded-xl border shadow-card animate-fade-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 border-b">
          <div>
            <h2 className="text-xl font-bold text-foreground">Members</h2>
            <p className="text-sm text-muted-foreground">Manage your gym members</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search members..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 w-64"
              />
            </div>
            <Button className="gap-2" onClick={onAddMember}>
              <UserPlus className="w-4 h-4" />
              Add Member
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/30">
                <th className="text-left px-6 py-4 text-sm font-semibold text-muted-foreground">Member</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-muted-foreground">Phone</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-muted-foreground">Plan</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-muted-foreground">Status</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-muted-foreground">Join Date</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody>
              {filteredMembers.map((member, index) => (
                <tr 
                  key={member.id} 
                  className="border-b last:border-0 hover:bg-muted/20 transition-colors"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-sm font-semibold text-primary">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{member.name}</p>
                        <p className="text-sm text-muted-foreground">{member.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">{member.phone}</td>
                  <td className="px-6 py-4">
                    <Badge variant="outline" className="font-medium">
                      {member.plan}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <Badge className={cn("capitalize border", statusStyles[member.status])}>
                      {member.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">
                    {new Date(member.joinDate).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric', 
                      year: 'numeric' 
                    })}
                  </td>
                  <td className="px-6 py-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setViewMember(member)}>
                          View Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setViewMember(member)}>
                          Edit Member
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleRenew(member)}>
                          Renew Membership
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="text-destructive"
                          onClick={() => setDeleteMember(member)}
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredMembers.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12">
            <p className="text-muted-foreground">No members found</p>
          </div>
        )}
      </div>

      <ViewMemberDialog
        open={!!viewMember}
        onOpenChange={(open) => !open && setViewMember(null)}
        member={viewMember}
      />

      <DeleteMemberDialog
        open={!!deleteMember}
        onOpenChange={(open) => !open && setDeleteMember(null)}
        memberName={deleteMember?.name || ""}
        onConfirm={() => deleteMember && onDeleteMember(deleteMember.id)}
      />
    </>
  );
}
