import React, { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployee } from '@/store/admin/employee-slice';
import { DialogDetails } from '@/components/management-view/DialogDetails';
import { Button } from '@/components/ui/button';

function ManagementHome() {
  const { employeeList } = useSelector((state) => state.employeeData);
  const dispatch = useDispatch()

  const [openEmployeeDialog, setOpenEmployeeDialog] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState(null)

  useEffect(() => {
    dispatch(fetchEmployee())
  }, [dispatch])

  return (
    <div className='flex justify-center lg:px-20 items-center overflow-x-auto shadow-md sm:rounded-lg'>
      <Table className="w-full">
        <TableCaption>List of Registered Employees</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Employee</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Contract</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Gender</TableHead>
            <TableHead>Salary</TableHead>
            <TableHead className="text-right sr-only">View</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employeeList && employeeList.length > 0
            ? employeeList.map((item) => (
              <TableRow key={item._id}>
                <TableCell className="flex items-center gap-3">
                  <img
                    src={item.image}
                    alt="Employee"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <span className="font-medium">{item.name}</span>
                </TableCell>
                <TableCell>{item.department}</TableCell>
                <TableCell>{item.contract}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.gender}</TableCell>
                <TableCell>Ksh {item.salary.toLocaleString()}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedEmployee(item);
                      setOpenEmployeeDialog(true);
                    }}
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))
            : null}
        </TableBody>
      </Table>

      {/* --- Render DialogDetails when openEmployeeDialog is true --- */}
      {selectedEmployee && (
        <Dialog open={openEmployeeDialog} onOpenChange={setOpenEmployeeDialog}>
          <DialogContent className="sm:max-w-[500px] lg: min-w-[600px] lf">
            <DialogDetails item={selectedEmployee} />
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

export default ManagementHome
