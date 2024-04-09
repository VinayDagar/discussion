"use client";

import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { default as AxiosFactory } from "@/lib/axios-factory";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";

interface ILoginResponse {
  token: string;
}

const LoginForm = () => {
  const navigate = useRouter();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  // const [isPasswordType, setIsPasswordType] = useState<boolean>(true);

  const handleLogin = useCallback(async () => {
    console.log("LOGIN");

    setLoading(true);
    const payload = {
      email,
      password,
    };

    const response = await AxiosFactory.post<ILoginResponse>(
      "auth/login",
      payload
    );
    localStorage.setItem("x-access-token", response.data.token);
    setLoading(false);
    navigate.replace("/");
  }, [email, navigate, password]);

  return (
    <>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label
            className="text-sm font-medium text-gray-700"
            htmlFor="username"
          >
            Email
          </Label>
          <Input
            className="w-full p-2 border border-gray-300 rounded"
            id="username"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            type="email"
          />
        </div>
        <div className="space-y-2">
          <Label
            className="text-sm font-medium text-gray-700"
            htmlFor="password"
          >
            Password
          </Label>
          <Input
            className="w-full p-2 border border-gray-300 rounded"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
            type="password"
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-end flex-col">
        <Button
          // disabled={loading || !email || !password}
          onClick={handleLogin}
          className="w-32 text-white bg-blue-500 hover:bg-blue-700"
        >
          Login
        </Button>
        <Link
          className="block text-center mt-4 text-sm text-blue-500 hover:underline"
          href="#"
        >
          Forgot your password?
        </Link>
        OR
        <Link
          className="block text-center mt-4 text-sm text-blue-500 hover:underline"
          href="/register"
        >
          Register
        </Link>
      </CardFooter>
    </>
  );
};

export default LoginForm;
