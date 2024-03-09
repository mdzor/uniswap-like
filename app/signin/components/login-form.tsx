"use client";
import React, { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";



type Props = {
  className?: string;
  callbackUrl?: string;
  error?: string;
};

const LoginForm = (props: Props) => {

  const [email, setEmail] = useState<undefined | string>("test@test.com");
  const [password, setPassword] = useState<undefined | string>();

  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      email: email,
      password: password,
      redirect: true,
      callbackUrl: '/explorer'
    });

    if (!res?.error) {
      router.push(props.callbackUrl ?? "http://localhost:3000");
    }
  };
  return (

    <form onSubmit={handleSubmit}>

      <div className="grid gap-2">
        <div className="grid gap-1">
          {props.error && <div className="text-red-500">
            Unable to sign in; please verify your email and password.
          </div>}
        </div>
        <div className="grid gap-1">
          <Label className="sr-only" htmlFor="email">
            Email
          </Label>
          <Input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            id="email"
            placeholder="name@example.com"
            type="email"
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect="off"
          />
        </div>
        <div className="grid gap-1">
          <Label className="sr-only" htmlFor="email">
            Email
          </Label>
          <Input
            id="password"
            placeholder=""
            type="password"
            autoCapitalize="none"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <Button >

          Sign In
        </Button>
      </div>
    </form>


  );
};

export default LoginForm;