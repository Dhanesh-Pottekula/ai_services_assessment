import  { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface CreateStackModalProps {
  onStackCreate?: (stackData: { name: string; description: string }) => void
}

export function CreateStackModal({ onStackCreate }: CreateStackModalProps) {
  const [name, setName] = useState("Chat With PDF")
  const [description, setDescription] = useState("Chat with your pdf docs")
  const [open, setOpen] = useState(false)

  const handleCreate = () => {
    if (name.trim() && description.trim()) {
      onStackCreate?.({ name: name.trim(), description: description.trim() })
      setOpen(false)
      // Reset form
      setName("Chat With PDF")
      setDescription("Chat with your pdf docs")
    }
  }

  const handleCancel = () => {
    setOpen(false)
    // Reset form
    setName("Chat With PDF")
    setDescription("Chat with your pdf docs")
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button  className="bg-green-600 hover:bg-green-700">
          <Plus className="h-4 w-4" />
          New Stack
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Stack</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter stack name"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter stack description"
              rows={3}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button  onClick={handleCreate}>
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 