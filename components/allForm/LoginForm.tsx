"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CookieHelper } from "@/helper/cookie.helper";
import mainLogo from "@/public/icon/mainlogo.png";
import { UserService } from "@/service/user/user.service";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
type LoginFormInputs = {
  email: string;
  password: string;
};
export default function LoginForm() {
  const [isDisable, setIsDisable] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  const onSubmit = async (data: LoginFormInputs) => {
    setIsDisable(true);
    try {
      const response = await UserService.login(data);
      
      if (response?.data?.success === true) {
        const tokenNumber = response?.data?.tokens?.accessToken;
        const userType = response?.data?.data?.role;
        CookieHelper.set({
          key: "jobtoken",
          value: tokenNumber,
        });
        toast.success("Successfully login!");
         router.push( userType== "admin" ? "/dashboard" : "/");
        reset()
        setIsDisable(false);
      }
    } catch (error) {
      toast.error("Wrong Email or Password");
      setIsDisable(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="w-full max-w-md p-6 space-y-6  ">
        <div className="flex justify-center items-center">
          <Image src={mainLogo} alt="adminLogin" width={200} height={200} className="w-14 md:w-[200px]" />
        </div>
        <h2 className="text-2xl font-bold text-center text-white mt-6">Admin Login</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          <div className="space-y-2">
            <Label className="text-[14px] font-medium text-white ">Email</Label>
            <Input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Please enter a valid email address",
                },
              })}
              placeholder="example@example.com"
              className="rounded-md !h-[45px] text-[14px] text-whiteColor "
            />
            {errors.email && (
              <span className="text-sm text-red-500">{errors.email.message}</span>
            )}
          </div>

          <div className="space-y-2">
            <Label className="text-[14px] font-medium text-white ">Password</Label>
            <div className="relative">
              <Input
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                type={showPassword ? "text" : "password"}
                placeholder="Your password"
                className="rounded-md !h-[45px] text-[14px] pr-10 text-whiteColor "
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-100  hover:text-gray-300  focus:outline-none transition-colors duration-200"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            {errors.password && (
              <span className="text-sm text-red-500">{errors.password.message}</span>
            )}
          </div>
          <div className="w-full gap-3 mt-6">
            <button
              type="submit"
              className={`w-full py-2 rounded-md transition-all duration-200 ${
                isDisable 
                    ? 'bg-gray-400  cursor-not-allowed text-white' 
                  : 'bg-primaryColor hover:bg-primaryColor/90 active:bg-primaryColor/80  text-white'
              }`}
              disabled={isDisable}
            >
              {isDisable ? "Sending..." : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
