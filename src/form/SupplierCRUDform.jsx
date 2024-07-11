import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { ImPencil2 } from "react-icons/im";
import { BsTrash } from "react-icons/bs";

function SupplierCRUDform() {
  const [alert, setAlert] = useState(false);
  const [getData, setGetData] = useState([]);
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
    onSubmit: async (values) => {
      await axios.post("http://localhost:5000/supplier/post", values);

      fetchData();
    },
  });

  const fetchData = async () => {
    const resposne = await axios.get("http://localhost:5000/supplier/get");
    const resData = resposne.data;
    setGetData(resData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/supplier/delete/${id}`);
    fetchData();
  };

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
                  <label className="text-sm text-red-500">
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

        {alert ? (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <strong className="font-bold">Added!</strong>
            <span className="block sm:inline">The record has been added.</span>
            <span
              onClick={() => setAlert(!alert)}
              className="absolute top-0 bottom-0 right-0 px-4 py-3"
            >
              <svg
                className="fill-current h-6 w-6 text-red-500"
                role="button"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <title>Close</title>
                <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
              </svg>
            </span>
          </div>
        ) : null}

        <div>
          <table className="w-full">
            <thead>
              <tr>
                <th>Id</th>
                <th>Supplier Category</th>
                <th>Supplier Name</th>
                <th>Contact</th>
                <th>Currency</th>
                <th>ROE</th>
                <th>Commission</th>
                <th>Email</th>
                <th>Address</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {getData.map((item, idx) => (
                <tr key={idx}>
                  <td className="pl-3">{item.id}</td>
                  <td className="pl-5">{item.supplier_Category}</td>
                  <td className="pl-5">{item.supplier_Name}</td>
                  <td className="pl-5">{item.contact_Number}</td>
                  <td className="pl-5">{item.currency}</td>
                  <td className="pl-5">{item.roe}</td>
                  <td className="pl-5">{item.commision}</td>
                  <td className="pl-5">{item.email}</td>
                  <td className="pl-5">{item.address}</td>
                  <td className="flex items-center justify-between text-xl font-bold">
                    <span className="text-indigo-500">
                      <ImPencil2 />
                    </span>
                    <span
                      onClick={() => handleDelete(item.id)}
                      className="text-orange-500"
                    >
                      <BsTrash />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default SupplierCRUDform;
