export const LoginFormControls =[
    {
        label: 'Email',
        name: 'email',
        type: 'email',
        placeholder: 'Enter your email',
        required: true
    },
    {
        label: 'Password',
        name: 'password',
        type: 'password',
        placeholder: 'Enter your password',
        required: true
    }
]
export const registerFormControls =[
    {
        label: 'User Name',
        name: 'userName',
        type: 'text',
        placeholder: 'Enter your first name',
      //  required: true
    },
    {
        label: 'Email',
        name: 'email',
        type: 'email',
        placeholder: 'Enter your email',
        // required: true
    },
    {
        label: 'Password',
        name: 'password',
        type: 'password',
        placeholder: 'Enter your password',
       // required: true
    },
    {
        label: 'Confirm Password',
        name: 'confirmPassword',
        type: 'password',
        placeholder: 'Confirm your password',
       // required: true
    }
];
export const ManagementViewHeaderMenuItems = [
    {
      id: "home",
      label: "Home",
      path: "/shop/home",
    },
    {
      id: "footwear",
      label: "Footwear",
      path: "/shop/listing",
    },
    {
      id: "accessories",
      label: "Accessories",
      path: "/shop/listing",
    },
    {
      id: "search",
      label: "Search",
      path: "/shop/search",
    },
  ];
  export const addEmployeeFormElements = [
    {
      label: "Name",
      name: "name",
      componentType: "input",
      type: "text",
      placeholder: "Enter product title",
    },
    {
      label: "Description",
      name: "description",
      componentType: "textarea",
      placeholder: "Enter product description",
    },
    {
      label: "Gender",
      name: "gender",
      componentType: "select",
      options: [
        { id: "male", label: "Male" },
        { id: "female", label: "Female" },
      ],
    },
    {
      label: "Contract type",
      name: "contract",
      componentType: "select",
      options: [
        { id: "longTerm", label: "Long Term" },
        { id: "shortTerm", label: "Short Term" },
      ],
    },
    {
      label: "Department",
      name: "department",
      componentType: "select",
      options: [
        { id: "sales", label: "Sales" },
        { id: "Marketing", label: "Marketing" },
        { id: "Developer", label: "Developer" },
        { id: "partner", label: "Partner" },
        { id: "ceo", label: "CEO" },
        { id: "Field", label: "field" },
      ],
    },
    {
      label: "Salary",
      name: "salary",
      componentType: "input",
      type: "number",
      placeholder: "Enter his/her price",
    },
    {
      label: "Email",
      name: "email",
      componentType: "input",
      type: "email",
      placeholder: "Enter his/her Email",
    },
    
  ];