import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
function SupplierCRUDform() {
  const formik = useFormik({
    initialValues: {
      supplier_Category: "",
      supplier_Name: "",
      contact_Number: "",
      currency: "",
      roe: "",
      commision: "",
      email: "",
      address: "",
    },
    validationSchema: Yup.object({
      supplier_Name: Yup.string().required(),
      contact_Number: Yup.number().required(),
      address: Yup.string().required(),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <div>
      <div className="">
        <div className="w-96 border-2 rounded-lg mx-auto p-4 m-4">
          <form onSubmit={formik.handleSubmit}>
            {[
              { name: "supplier_Category", label: "Supplier Category" },
              { name: "supplier_Name", label: "Supplier Name" },
              { name: "contact_Number", label: "Contact Number" },
              { name: "currency", label: "Currency" },
              { name: "roe", label: "ROE" },
              { name: "commision", label: "Commission" },
              { name: "email", label: "Email" },
              { name: "address", label: "Address" },
            ].map(({ name, label }) => (
              <div className="my-2" key={name}>
                <label htmlFor={name}>{label}</label> <br />
                <input
                  id={name}
                  name={name}
                  value={formik.values[name]}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full border-2"
                />
                {formik.touched[name] && formik.errors[name] ? (
                  <label className="text-sm text-red">
                    {formik.errors[name]}
                  </label>
                ) : null}
              </div>
            ))}
            <button
              type="submit"
              className="border-2 px-6 py-1 bg-blue-500 text-white"
            >
              save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SupplierCRUDform;
