import { RiArrowRightBoxFill, RiEye2Fill, RiEyeLine } from "react-icons/ri";
import { useState } from "react";

function HomePage() {
  const [next, setNext] = useState(false);

  const nextPage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setNext(true);
  };

  const toggleViewPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const passwordInput = document.getElementById(
      "password",
    ) as HTMLInputElement;
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
    } else {
      passwordInput.type = "password";
    }
  };
  return (
    <div className="flex items-center justify-center h-screen gap-4">
      <section className="bg-primary h-full w-1/2 relative">
        <img src="logo.svg" alt="logo" className="absolute top-8 left-8 h-20" />
        <img src="/bg.png" alt="coverimage" className="h-full bg-cover" />
      </section>
      <section className="w-1/2 p-10">
        <div className="p-8 shadow-lg rounded-lg h-85vh flex flex-col justify-center gap-4">
          <p className="subtitle1 pb-1 text-3xl">WELCOME TO</p>
          <p className="text-[#0ca85d] text-3xl">
            Inua Mkulima - <br />
            Subsidy Program
          </p>
          <form action="">
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
                  className="border-b pb-2 border-gray-300 rounded-md w-full"
                />
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
                {/* input with toggle see */}
                <div className="relative">
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="border-b pb-2 border-gray-300 rounded-md w-full"
                  />
                  <button
                    onClick={toggleViewPassword}
                    type="button"
                    className="absolute right-0 top-2"
                  >
                    <RiEyeLine />
                  </button>
                </div>

                <button className="btn-yellow hover:bg-yellow-700 text-white px-4 py-2 rounded-md w-full mt-4">
                  Sign In
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
