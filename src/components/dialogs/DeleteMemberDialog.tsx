import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { toast } from "sonner";

interface DeleteMemberDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  memberName: string;
  onConfirm: () => void;
}

export function DeleteMemberDialog({ open, onOpenChange, memberName, onConfirm }: DeleteMemberDialogProps) {
  const handleDelete = () => {
    onConfirm();
    toast.success(`${memberName} has been removed`);
    onOpenChange(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Member</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete <strong>{memberName}</strong>? This action cannot be undone and will remove all their membership data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
