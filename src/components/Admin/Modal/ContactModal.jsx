import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getBorderColor } from "../../../utils/Helpers";
import client from "../../../utils/client";
const ContactModal = ({ onClose, contact, refresh }) => {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, touchedFields },
  } = useForm({
    mode: "onchange",
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  useEffect(() => {
    console.log(contact);
    if (contact) {
      console.log(contact);
      reset({
        name: contact.name,
        email: contact.email,
        message: contact.message,
      });
    }
  }, [contact, reset]);

  const onSubmit = (data) => {};

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl">
        <h2 className="text-xl font-bold mb-4">Edit Contact</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div className="mb-4">
            <label htmlFor="fname" className="block text-gray-700 mb-2">
              First Name
            </label>
            <input
              id="fname"
              type="text"
              className={`w-full px-3 py-2 border border-gray-300 rounded-md h-14 ${getBorderColor(
                "fname",
                errors,
                touchedFields
              )}`}
              {...register("fname", { required: "First Name is required" })}
            />
            {errors.fname && (
              <p className="text-red-500 text-sm mt-1">
                {errors.fname.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="lname" className="block text-gray-700 mb-2">
              Last Name
            </label>
            <input
              id="lname"
              type="text"
              className={`w-full px-3 py-2 border border-gray-300 rounded-md h-14 ${getBorderColor(
                "lname",
                errors,
                touchedFields
              )}`}
              {...register("lname", { required: "Last Name is required" })}
            />
            {errors.lname && (
              <p className="text-red-500 text-sm mt-1">
                {errors.lname.message}
              </p>
            )}
          </div>

          <div className="flex justify-end col-span-1 md:col-span-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-md text-gray-500 border border-gray-300 mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-md font-semibold border-2 text-green-500 border-green-500 hover:bg-green-500 hover:text-white"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactModal;
