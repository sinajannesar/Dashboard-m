"use client";
import Sidebar from "@/components/sidebar/sidebar";
// import { useEffect, useState, useCallback } from "react";
// import { useRouter } from "next/navigation";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // const [isVerified, setIsVerified] = useState<boolean | null>(null);
  // const router = useRouter();

  // // تابع چک کردن کاربر در API (با استفاده از useCallback)
  // const checkUserInAPI = useCallback(async (email: string) => {
  //   try {
  //     const res = await fetch("https://reqres.in/api/users");
  //     const data = await res.json();
  //     const exists = data.data.some((u: any) => u.email === email);

  //     if (!exists) {
  //       router.push("/login");
  //     } else {
  //       setIsVerified(true);
  //     }
  //   } catch (error) {
  //     console.error("API Error:", error);
  //     router.push("/login");
  //   }
  // }, [router]);

  // // بررسی وضعیت کاربر
  // useEffect(() => {
  //   fetch("/api/auth/me")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       if (data.user?.email) {
  //         checkUserInAPI(data.user.email);
  //       }
  //     });
  // }, [checkUserInAPI]); // ✅ `checkUserInAPI` به‌عنوان وابستگی اضافه شد

  // if (!isVerified) return <p>در حال بررسی...</p>;

  return (
    <div className="h-screen flex flex-col">
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex-1 overflow-auto">{children}</div>
      </div>
    </div>
  );
}
