import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import LoginStyles from "./login.module.css";
import LoginForm from "./_components/login-form";

const LoginPage = () => {
  return (
    <section className={`h-screen ${LoginStyles.loginWrapper}`}>
      <div className={`h-screen`}>
        <Card className={`max-w-md mx-auto ${LoginStyles.cardMargin}`}>
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center qthread-logo">
              QThread!
            </CardTitle>
            <CardDescription className="text-center text-sm">
              Unravel Knowledge, Stitch By Stitch.
            </CardDescription>
          </CardHeader>
          <LoginForm />
        </Card>
      </div>
    </section>
  );
};

export default LoginPage;
