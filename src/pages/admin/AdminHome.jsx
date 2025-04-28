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
import { addEmployeeFormElements } from "@/config";

import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

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
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [openCreateProductDialog, setCreateProductDialogue] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const dispatch = useDispatch();

  function isFormValid() {
    return Object.keys(formData)
      .map((key) => formData[key] !== "")
      .every((item) => item);
  }
  console.log(isFormValid())
  function onSubmit(e) {
    e.preventDefault();
    console.log(formData, "form data admin");
  }

  return (
    <Fragment>
      <div
        onClick={() => setCreateProductDialogue(true)}
        className="flex justify-end mb-5 w-full"
      >
        <Button>Add Employee</Button>
      </div>

      <div className="flex justify-center lg:px-20  items-center overflow-x-auto shadow-md sm:rounded-lg">
        <Table className="">
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Invoice</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Method</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">INV001</TableCell>
              <TableCell>Paid</TableCell>
              <TableCell>Credit Card</TableCell>
              <TableCell className="text-right">$250.00</TableCell>
            </TableRow>
          </TableBody>
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
                currentEditedId !== null ? "Edit Product" : "Add Product"
              }
              formData={formData}
              setFormData={setFormData}
              onSubmit={onSubmit}
              formcontrols={addEmployeeFormElements}
              isBtnDisabled={currentEditedId !== null ? isFormValid() : null}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
}

export default AdminHome;
