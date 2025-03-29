"use client"

import { UserLoginForm } from "@/actions/user.action";
import ErrorMessage from "@/components/ui/ErrorMessage";
import InputField from "@/components/ui/InputField";
import SubmitButton from "@/components/ui/SubmitButton";
import { useActionState } from "react";
import { FiMail, FiLock } from "react-icons/fi";

export default function Home() {
  const [state, formAction,isPending] = useActionState(UserLoginForm,null);

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100">
      <form className="w-full max-w-sm bg-white p-6 rounded-2xl shadow-lg" action={formAction}>
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Welcome Back
        </h2>
        <div className=" text-center mb-3">
          {state?.error&&<ErrorMessage error={state.error}/>}
        </div>
        <div className="mb-4">
          <InputField
            type="text"
            required={true}
            name="email"
            placeholder="E-mail"
            icon={FiMail}
          />
        </div>
        <div className="mb-6">
          <InputField
            type="password"
            required={true}
            name="password"
            placeholder="Password"
            icon={FiLock}
          />
        </div>
        <SubmitButton isPending={isPending}>Login</SubmitButton>
        <div className="mt-6">
        {state?.errors?.map((e:string)=><ErrorMessage error={e} key={e}/>)}
        </div>
      </form>
    </main>
  );
}
