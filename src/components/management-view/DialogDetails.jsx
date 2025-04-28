import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
// DialogDetails.jsx
export function DialogDetails({ item }) {
    return (
      <div className="flex flex-col  items-center gap-4">
        <img
          src={item.image}
          alt={item.name}
          className="w-80 h-80 rounded-lg object-cover"
        />
        <DialogHeader className="text-center">
          <DialogTitle className="text-2xl">{item.name}</DialogTitle>
          <DialogDescription>{item.description}</DialogDescription>
        </DialogHeader>
  
        <div className="grid gap-4 py-6 w-full">
          <div className="flex justify-between">
            <span className="font-semibold">Department:</span>
            <span>{item.department}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Contract:</span>
            <span>{item.contract}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Email:</span>
            <span>{item.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Gender:</span>
            <span>{item.gender}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Salary:</span>
            <span>Ksh {item.salary.toLocaleString()}</span>
          </div>
        </div>
      </div>
    );
  }
  