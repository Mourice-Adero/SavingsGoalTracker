import { RiArrowRightBoxFill, RiEye2Fill, RiEyeLine } from "react-icons/ri";
import { useState } from "react";
import { useNavigate } from "react-router";
import userService from "../services/userService";

function HomePage() {
  const [next, setNext] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const nextPage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!username.trim()) {
      setError("Please enter your username");
      return;
    }
    setError(null);
    setNext(true);
  };

  const toggleViewPassword = (e?: React.MouseEvent<HTMLButtonElement>) => {
    e?.preventDefault();
    setShowPassword((s) => !s);
  };

  const signIn = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!password) return setError("Please enter your password");
    setLoading(true);
    setError(null);
    try {
      const resp = await userService.loginUser(username.trim(), password);
      if (resp?.token) {
        localStorage.setItem("token", resp.token);
        navigate("/dashboard");
      } else {
        setError("Invalid login response");
      }
    } catch (err: any) {
      setError(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex items-center justify-center h-screen gap-4">
      <section className="bg-primary h-full w-1/2 relative">
        <img src="logo.svg" alt="logo" className="absolute top-8 left-8 h-20" />
        <img src="bg.png" alt="coverimage" className="h-full bg-cover" />
      </section>
      <section className="w-1/2 p-10 ">
        <div className="p-8 shadow-lg rounded-lg h-85vh flex flex-col justify-center gap-4 relative">
          <img
            src="green-leaves-white-background.png"
            alt="greenleavesImage"
            className="absolute top-0 right-0 h-50"
          />
          <p className="subtitle1 pb-1 text-3xl">WELCOME TO</p>
          <p className="text-[#0ca85d] text-3xl">
            Inua Mkulima - <br />
            Subsidy Program
          </p>
          <form onSubmit={signIn}>
            {!next && (
              <div>
                <p className="mt-4">Enter your username to continue</p>
                <label htmlFor="username" className="subtitle1 mb-[-3]">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="border-b pb-2 border-gray-300 rounded-md w-full"
                />
                {error && !next && (
                  <div className="text-red-500 text-sm mt-2">{error}</div>
                )}
                <button
                  onClick={nextPage}
                  className="btn-yellow hover:bg-yellow-700 text-white px-4 py-2 rounded-md w-full mt-4"
                >
                  Continue
                  <RiArrowRightBoxFill className="inline-block ml-2" />
                </button>
              </div>
            )}
            {next && (
              <div>
                <p className="mt-4">Enter your password to continue</p>
                <label htmlFor="password" className="subtitle1 mb-[-3]">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border-b pb-2 border-gray-300 rounded-md w-full"
                  />
                  <button
                    onClick={toggleViewPassword}
                    type="button"
                    className="absolute right-2 top-2"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? <RiEye2Fill /> : <RiEyeLine />}
                  </button>
                </div>
                {error && next && (
                  <div className="text-red-500 text-sm mt-2">{error}</div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-yellow hover:bg-yellow-700 text-white px-4 py-2 rounded-md w-full mt-4 disabled:opacity-60"
                >
                  {loading ? "Signing in..." : "Sign In"}
                  <RiArrowRightBoxFill className="inline-block ml-2" />
                </button>
              </div>
            )}
          </form>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
