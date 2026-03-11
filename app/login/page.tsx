"use client";
 
import { SunIcon as Sunburst } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

 
export default function FullScreenSignup () {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
 
  const validateUsername = (value: string) => {
    return value.trim().length >= 3;
  };
 
  const validatePassword = (value: string) => {
    return value.length >= 8;
  };
 
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError("");
    setUsernameError("");
    setPasswordError("");

    let valid = true;

    if (!validateUsername(username)) {
      setUsernameError("Please enter your registered username.");
      valid = false;
    }

    if (!validatePassword(password)) {
      setPasswordError("Please enter a password with at least 8 characters.");
      valid = false;
    }

    if (!valid) return;

    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Login failed");
        return;
      }

      const role = data.user.role as "ADMIN" | "CASHIER";

      if (role === "ADMIN") {
        router.push("/admin");
      } else if (role === "CASHIER") {
        router.push("/cashier");
      } else {
        setError("Unknown user role");
      }
    } catch (err) {
      setError("Unexpected error");
    } finally {
      setLoading(false);
    }
  
  };
 
  return (
    <div className="min-h-screen  flex items-center justify-center overflow-hidden p-4">
      <div className=" w-full relative rounded-3xl max-w-5xl overflow-hidden flex flex-col md:flex-row shadow-xl">
        <div className="w-full h-full z-2 absolute bg-linear-to-t from-transparent to-black"></div>
        <div className="flex absolute z-2  overflow-hidden backdrop-blur-2xl ">
          <div className="h-[40rem] z-2 w-[4rem] bg-linear-90 from-[#ffffff00] via-[#000000] via-[69%] to-[#ffffff30] opacity-30 overflow-hidden"></div>
          <div className="h-[40rem] z-2 w-[4rem] bg-linear-90 from-[#ffffff00] via-[#000000] via-[69%] to-[#ffffff30]  opacity-30 overflow-hidden"></div>
          <div className="h-[40rem] z-2 w-[4rem] bg-linear-90 from-[#ffffff00] via-[#000000] via-[69%] to-[#ffffff30]  opacity-30 overflow-hidden"></div>
          <div className="h-[40rem] z-2 w-[4rem] bg-linear-90 from-[#ffffff00] via-[#000000] via-[69%] to-[#ffffff30]  opacity-30 overflow-hidden"></div>
          <div className="h-[40rem] z-2 w-[4rem] bg-linear-90 from-[#ffffff00] via-[#000000] via-[69%] to-[#ffffff30]  opacity-30 overflow-hidden"></div>
          <div className="h-[40rem] z-2 w-[4rem] bg-linear-90 from-[#ffffff00] via-[#000000] via-[69%] to-[#ffffff30]  opacity-30 overflow-hidden"></div>
        </div>
        <div className="w-[15rem] h-[15rem] bg-orange-500 absolute z-1 rounded-full bottom-0"></div>
        <div className="w-[8rem] h-[5rem] bg-white absolute z-1 rounded-full bottom-0"></div>
        <div className="w-[8rem] h-[5rem] bg-white absolute z-1 rounded-full bottom-0"></div>
 
        <div className="bg-black text-white p-8 md:p-12 md:w-1/2 relative rounded-bl-3xl  overflow-hidden">
          <h1 className="text-2xl md:text-3xl font-medium leading-tight z-10 tracking-tight relative">
            Run Your Store Smarter
          </h1>
          <p className="mt-4 text-lg md:text-xl leading-tight tracking-tight z-10 font-light relative"> Manage sales, track transactions, and keep your business moving — all in one point of sale system.</p>
        </div>
 
        <div className="p-8 md:p-12 md:w-1/2 flex flex-col bg-secondary z-99 text-secondary-foreground ">
          <div className="flex flex-col items-left mb-8">
            <div className="text-orange-500 mb-4">
              <Sunburst className="h-10 w-10" />
            </div>
            <h2 className="text-3xl font-medium mb-2 tracking-tight">
              Access Your POS Dashboard
            </h2>
            <p className="text-left opacity-80">
              Enter your credentials to access the system.
            </p>
          </div>
 
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit}
            noValidate
          >
            <div>
              <label htmlFor="text" className="block text-sm mb-2">
                Username
              </label>
              <input
                type="text"
                id="username"
                placeholder="Enter your username"
                className={`text-sm w-full py-2 px-3 border rounded-lg focus:outline-none focus:ring-1 bg-white text-black focus:ring-orange-500 ${
                  usernameError ? "border-red-500" : "border-gray-300"
                }`}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                aria-invalid={!!usernameError}
                aria-describedby="username-error"
              />
              {usernameError && (
                <p id="usetrname-error" className="text-red-500 text-xs mt-1">
                  {usernameError}
                </p>
              )}
            </div>
 
            <div>
              <label htmlFor="password" className="block text-sm mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                className={`text-sm w-full py-2 px-3 border rounded-lg focus:outline-none focus:ring-1 bg-white text-black focus:ring-orange-500 ${
                  passwordError ? "border-red-500" : "border-gray-300"
                }`}
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
                aria-invalid={!!passwordError}
                aria-describedby="password-error"
              />
              {passwordError && (
                <p id="password-error" className="text-red-500 text-xs mt-1">
                  {passwordError}
                </p>
              )}
            </div>
 
            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            > {loading ? "Signing in..." : "Sign In"}
            </button>
            <div className="text-center text-gray-600 text-sm">
              Forgot your password? please contact your administrator
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
 
