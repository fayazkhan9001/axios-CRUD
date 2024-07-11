import React, { useEffect, useState } from "react";

import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { BsPencilSquare } from "react-icons/bs";
import { MdDeleteForever } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const UserInputForm = () => {
  const [data, setData] = useState([]);
  const [getData, setGetData] = useState();
  const [deleteMsg, setDeleteMsg] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      supplier_Category: getData?.supplier_Category || "",
      supplier_Name: getData?.supplier_Name || "",
      contact_Number: getData?.contact_Number || "",
      currency: getData?.currency || "",
      roe: getData?.roe || "",
      commision: getData?.commision || "",
      email: getData?.email || "",
      address: getData?.address || "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      supplier_Category: Yup.string()
        .min(4, "Minimum 4 characters required")
        .max(15, "Maximum 15 characters required")
        .required("Supplier Category is required"),
      supplier_Name: Yup.string()
        .min(4, "Minimum 4 characters required")
        .max(15, "Maximum 15 characters required")
        .required("Supplier Name is required"),
      contact_Number: Yup.string()
        .matches(
          /^((\+92)?(0092)?(92)?(0)?)(3)([0-9]{9})$/gm,
          "Invalid contact number"
        )
        .required("Contact Number is required"),
      currency: Yup.number()
        .integer("Currency must be an integer")
        .positive("Currency must be a positive number")
        .lessThan(10000, "Should be less than 10000$")
        .moreThan(100, "Should be more than 100$")
        .required("Currency is required"),
      roe: Yup.number()
        .required("ROE is required")
        .positive("ROE must be a positive number"),
      commision: Yup.number()
        .required("Commission is required")
        .positive("Commission must be a positive number"),
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      address: Yup.string().required("Address is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        if (getData) {
          const response = await axios.patch(
            `http://localhost:5000/supplier/update/${getData?.id}`,
            values
          );
          fetchData();
          setGetData("");
          resetForm();
        } else {
          const response = await axios.post(
            "http://localhost:5000/supplier/post",
            values
          );
          fetchData();
          resetForm();
        }
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    },
  });

  const fetchData = async () => {
    await axios
      .get("http://localhost:5000/supplier/get")
      .then((res) => setData(res.data));
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    await axios
      .delete(`http://localhost:5000/supplier/delete/${id}`)
      .then((res) => setDeleteMsg(res.status));
    fetchData();
  };

  const handleUpdate = async (id) => {
    const response = await axios.get(
      `http://localhost:5000/supplier/get/${id}`
    );
    setGetData(response?.data?.data);
  };
  return (
    <div>
      <div className="border-2 max-w-md mx-auto p-6 my-4 rounded-3xl">
        <form onSubmit={formik.handleSubmit}>
          {[
            { name: "supplier_Category", label: "Supplier Category" },
            { name: "supplier_Name", label: "Supplier Name" },
            { name: "contact_Number", label: "Contact Number" },
            { name: "currency", label: "Currency", placeholder: "$" },
            { name: "roe", label: "ROE" },
            { name: "commision", label: "Commission" },
            { name: "email", label: "Email" },
            { name: "address", label: "Address" },
          ].map(({ name, label, placeholder }) => (
            <div className="m-1" key={name}>
              <label htmlFor={name}>{label}</label>
              <input
                name={name}
                id={name}
                placeholder={placeholder || ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values[name]}
                className="border-[2px] w-full rounded-full px-2"
              />
              {formik.touched[name] && formik.errors[name] ? (
                <label className="text-sm text-red-400">
                  {formik.errors[name]}
                </label>
              ) : null}
            </div>
          ))}

          <button
            type="submit"
            className="m-3 border-2 px-8 py-1 bg-indigo-600 text-white rounded-full"
          >
            {getData ? "update" : "save"}
          </button>
        </form>
      </div>

      <div className="table-container">
        {deleteMsg == 200 ? (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <strong className="font-bold">Warning!</strong>
            <span className="block sm:inline">
              {" "}
              The record has been deleted.
            </span>
            <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
              <svg
                className="fill-current h-6 w-6 text-red-500"
                role="button"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <title>Close</title>
                <path
                  onClick={() => setDeleteMsg(false)}
                  d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"
                />
              </svg>
            </span>
          </div>
        ) : null}
        <table className="table-auto w-full my-10">
          <thead>
            <tr>
              <th className=" py-2">ID</th>
              <th className=" py-2">Supplier Category</th>
              <th className=" py-2">Supplier Name</th>
              <th className="pr-6 py-2">Contact Number</th>
              <th className=" py-2">Currency</th>
              <th className=" py-2">ROE</th>
              <th className=" py-2">Commission</th>
              <th className="pr-10 py-2">Email</th>
              <th className=" py-2">Address</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, idx) => (
              <tr key={idx}>
                <td className="pl-3 py-2">{item?.id}</td>
                <td className="pl-8 py-2">{item?.supplier_Category}</td>
                <td className="pl-8 py-2">{item.supplier_Name}</td>
                <td className="pl-8 py-2">{item.contact_Number}</td>
                <td className="pl-8 py-2">{item.currency}</td>
                <td className="pl-8 py-2">{item.roe}</td>
                <td className="pl-8 py-2">{item.commision}</td>
                <td className="pl-10 py-2">{item.email}</td>
                <td className="pl-8 py-2">{item.address}</td>

                <td className="flex items-center justify-between p-2 text-2xl  font-bold">
                  <span className="text-blue-700 cursor-pointer">
                    <BsPencilSquare onClick={() => handleUpdate(item?.id)} />
                  </span>
                  <span className="text-orange-600 cursor-pointer">
                    <MdDeleteForever onClick={() => handleDelete(item?.id)} />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserInputForm;
