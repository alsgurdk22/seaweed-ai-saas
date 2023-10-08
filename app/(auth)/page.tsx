import Image from "next/image";
import AuthForm from "@/components/auth-form";

const Auth = () => {
  return (
    <div 
      className="
        flex 
        min-h-full 
        flex-col 
        justify-center 
        py-12 
        sm:px-6 
        lg:px-8 
        bg-gray-100
      "
    >
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Image
          height="48"
          width="48"
          className="mx-auto w-auto animate-bounce"
          src="/logo.png"
          alt="Logo"
        />
        <h2 
          className="
            mt-6 
            text-center 
            text-3xl 
            font-bold 
            tracking-tight 
            text-gray-900
          "
          >
            J.A.R.V.I.S
        </h2>
      </div>
      <div className="sm:mx-auto sm:w-full sm:max-w-md mt-8">
        <AuthForm />
      </div>
  </div>
  )
}

export default Auth;