import { RiPhoneFill } from "react-icons/ri";

function Logout() {
  return (
    <div>
      <div className="inset-0 bg-black/60 fixed flex items-center justify-center">
        <div className="bg-white p-4 rounded shadow-lg flex flex-col items-center gap-4 px-20 py-10">
          <p>Log Out?</p>
          <RiPhoneFill />
          <div className="mb-4">Are you sure you want to logout?</div>
          <div className="flex justify-evenly w-full gap-4">
            <button className="py-1 px-6 border rounded-sm">Back</button>
            <button className="py-1 px-6 border rounded-md bg-black text-white">
              Yes, log out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Logout;
