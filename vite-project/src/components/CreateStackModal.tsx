import  { useState, useEffect } from "react"
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
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { createStack, selectCreateStackLoading, selectCreateStackError, clearCreateError } from "@/store/slices/stackSlice"

interface CreateStackModalProps {
  onStackCreate?: (stackData: { name: string; description: string }) => void
}

export function CreateStackModal({ onStackCreate }: CreateStackModalProps) {
  const [name, setName] = useState("Chat With PDF")
  const [description, setDescription] = useState("Chat with your pdf docs")
  const [open, setOpen] = useState(false)

  const dispatch = useAppDispatch()
  const createLoading = useAppSelector(selectCreateStackLoading)
  const createError = useAppSelector(selectCreateStackError)

  // Clear error when modal opens
  useEffect(() => {
    if (open) {
      dispatch(clearCreateError())
    }
  }, [open, dispatch])

  const handleCreate = async () => {
    if (name.trim() && description.trim()) {
      const result = await dispatch(createStack({ 
        name: name.trim(), 
        description: description.trim() 
      }))
      
      // If successful, close modal and call optional callback
      if (createStack.fulfilled.match(result)) {
        setOpen(false)
        onStackCreate?.({ name: name.trim(), description: description.trim() })
        // Reset form
        setName("Chat With PDF")
        setDescription("Chat with your pdf docs")
      }
    }
  }

  const handleCancel = () => {
    setOpen(false)
    // Reset form
    setName("Chat With PDF")
    setDescription("Chat with your pdf docs")
    dispatch(clearCreateError())
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
              disabled={createLoading}
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
              disabled={createLoading}
            />
          </div>
          {createError && (
            <div className="text-red-500 text-sm">
              {createError}
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleCancel} disabled={createLoading}>
            Cancel
          </Button>
          <Button onClick={handleCreate} disabled={createLoading}>
            {createLoading ? "Creating..." : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 