"use client"
import { useToken } from "@/hooks/useToken";
import { UserService } from "@/service/user/user.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function ContactForm() {
  const { token } = useToken();
  const [isDisable, setIsDisable] = useState(false);
  // Use useForm hook to handle form validation and submission
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  // Handle form submission

  const addContactMutation = useMutation({
    mutationFn: async (data) => {
      const response = await UserService.addContact(data, token);
      return response;
    },
    onSuccess: () => {
      toast.success("Contact submitted successfully!");
      reset();
       setIsDisable(false);
    },
    onError: (error) => {
      toast.error("Failed to submit contact. Please try again.");
      setIsDisable(false);
    }
  })
  const onSubmit = async (data) => {
    try {
      setIsDisable(true);
      addContactMutation.mutate(data);
     
    } catch (error) {
      toast.error("Failed to submit contact. Please try again.");
    }

  };

  return (
    <div className=" p-6 lg:p-8 bg-white  rounded-lg" style={{ boxShadow: "0px 0px 10px 0px #dddddd" }}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Fast Name</label>
            <input
              type="text"
              placeholder="Enter your first name"
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md"
              {...register("firstName", { required: "First name is required" })}
            />
            {errors.firstName && <p className="text-red-500 text-xs">{errors.firstName.message.toString()}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Last Name</label>
            <input
              type="text"
              placeholder="Enter your last name"
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md"
              {...register("lastName", { required: "Last name is required" })}
            />
            {errors.lastName && <p className="text-red-500 text-xs">{errors.lastName.message.toString()}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Phone</label>
          <input
            type="tel"
            placeholder="Enter your number"
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md"
            {...register("phone", { required: "Phone number is required" })}
          />
          {errors.phone && <p className="text-red-500 text-xs">{errors.phone.message.toString()}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && <p className="text-red-500 text-xs">{errors.email.message.toString()}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Message</label>
          <textarea
            placeholder="Type your message"
            className="mt-2 w-full h-24 lg:h-28 px-4 py-2 border border-gray-300 rounded-md"
            {...register("message", { required: "Message is required" })}
          />
          {errors.message && <p className="text-red-500 text-xs">{errors.message.message.toString()}</p>}
        </div>

        <div>
          <button type="submit"   className={`md:py-3 disabled:bg-grayColor1 disabled:text-white/50 disabled:cursor-not-allowed md:px-4 text-sm md:text-base justify-center flex items-center gap-2 py-2 px-3 rounded-sm cursor-pointer w-full text-blackColor bg-primaryColor transition-all shadow-md duration-200 `}>
                  Submite
                   </button>
        </div>
      </form>
    </div>
  );
}
