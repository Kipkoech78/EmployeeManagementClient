import ProductImageUpload from "@/components/admin/uploadImage";
import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { addEmployeeFormElements } from "@/config";
import { addEmployee, deleteEmployee, editEmployee, fetchEmployee } from "@/store/admin/employee-slice";

import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, Toaster } from "sonner";
function AdminHome() {
  const initialFormData = {
    image: null,
    contract: "",
    description: "",
    department: "",
    email: "",
    salary: "",
    name: "",
    gender: "",
  };
  const [openDetailsDialogue, setOpendDetailsDilogue] = useState(false)
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [openCreateProductDialog, setCreateProductDialogue] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const { employeeList } = useSelector((state) => state.employeeData);
  const dispatch = useDispatch();
  function isFormValid() {
    return Object.keys(formData)
      .map((key) => formData[key] !== "")
      .every((item) => item);
  }
  console.log(isFormValid());
  function onSubmit(e) {
    e.preventDefault();
    currentEditedId !== null ?
    dispatch(editEmployee({
      id:currentEditedId, formData
    })).then(data=>{
      console.log(data)
      if(data?.payload?.success){
        setFormData(initialFormData)
        setCurrentEditedId(null)
        dispatch(fetchEmployee)
      }
    })
    :
    
    console.log(formData, "form data admin");
    dispatch(
      addEmployee({
        ...formData,
        image: uploadedImageUrl,
      })
    ).then((data) => {
      console.log(data, "data saved success");
      if (data?.payload?.success) {
        setFormData(initialFormData);
        setImageFile(null);
        setCreateProductDialogue(null);
        toast.success("Employee saved", {
          description: "Item Added",
        });
        dispatch(fetchEmployee());
      }
    });
  }
  useEffect(() => {
    dispatch(fetchEmployee());
  }, [dispatch]);
  console.log(employeeList, "data of employeeLIst");
  function handleDelete(id){
    dispatch(deleteEmployee(id)).then(data =>{
      if(data?.payload?.success){
        console.log(data)
        toast.success("data Edited success",{
          description:"Employee edited success"
        })
        dispatch(fetchEmployee())
      }
    })

  }
  // function handleEditEmployee(item){
  //   setFormData(item)
  //   console.log(id, "id")
  //   setCurrentEditedId(true)
  //   dispatch(editEmployee(item?._id)).the((data)=>{
  //     if(data?.payload?.success){
  //       toast.success("Data Edited success.",{
  //         description:"Employee Edited successfuly"
  //       })
  //       setFormData(initialFormData)
  //       setImageFile(null);
  //       setCreateProductDialogue(null);
        
  //     }
  //   })
  // }
  return (
    <Fragment>
      <div
        onClick={() => setCreateProductDialogue(true)}
        className="flex justify-end mb-5 w-full"
      >
        <Button>Add Employee</Button>
      </div>
      <div className="flex justify-center lg:px-20  items-center overflow-x-auto shadow-md sm:rounded-lg">
        <Table className="w-full">
          <TableCaption>List of Registered Employees</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Employee</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Contract</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>gender</TableHead>
              <TableHead >Salary (Ksh)</TableHead>
              <TableHead className='sr-only text-right' > edit   </TableHead>
            </TableRow>
          </TableHeader>
          {employeeList && employeeList.length > 0
            ? employeeList.map((item) => (
                <TableBody>
                  <TableRow>
                    <TableCell className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt=" "
                        className="w-18 h-18 rounded-full object-cover"
                      />
                      <span className="font-medium">{item.name}</span>
                    </TableCell>
                    <TableCell>{item.department}</TableCell>
                    <TableCell>{item.contract} </TableCell>
                    <TableCell>{item.email} </TableCell>
                    <TableCell>{item.gender} </TableCell>
                    <TableCell>{item.salary} </TableCell>
                    <TableCell >
                    <Button
                    onClick={()=>{
                      setCreateProductDialogue(true)
                      setCurrentEditedId(item?._id)
                      setFormData(item)
                    }
                    }
                    > Edit </Button>
                    
                    </TableCell>
                    <TableCell className="text-center cursor-pointer">
                     
                        <div onClick={()=>{
                          handleDelete(item?._id)
                        }}
                        className="bg-red-500 py-2  text-white font-bold " >Detete</div>
                
                    </TableCell>
                  </TableRow>
                </TableBody>
              ))
            : null
            }
        </Table>
      </div>
      <Sheet
        className=""
        open={openCreateProductDialog}
        onOpenChange={() => {
          setCreateProductDialogue(false);
          setCurrentEditedId(null);
          setFormData(initialFormData);
        }}
      >
        <SheetContent side="right" className=" w-[600px] sm:w-[540px] ">
          <SheetHeader>
            <SheetTitle>
              {" "}
              {currentEditedId === null ? "Add new Product" : "Edit Product"}
            </SheetTitle>
          </SheetHeader>
          <ProductImageUpload
            imageFile={imageFile}
            uploadedImageUrl={uploadedImageUrl}
            setImageFile={setImageFile}
            imageLoadingState={imageLoadingState}
            setImageLoadingState={setImageLoadingState}
            isEditMode={currentEditedId !== null}
            setUploadedImageUrl={setUploadedImageUrl}
          />
          <div className="py-6">
            <CommonForm
              buttonText={
                currentEditedId !== null ? "Edit Employee Data" : "Add Employee"
              }
              formData={formData}
              setFormData={setFormData}
              onSubmit={onSubmit}
              formcontrols={addEmployeeFormElements}
              isBtnDisabled={currentEditedId === null ? isFormValid() : null}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
}

export default AdminHome;
