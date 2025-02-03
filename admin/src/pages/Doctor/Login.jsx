import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { AdminContext } from "../../context/AdminContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
    const [state, setState] = useState("Admin");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { setAToken, backendUrl } = useContext(AdminContext);
    const navigate = useNavigate(); // Initialize useNavigate

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        try {
            if (state === "Admin") {
                const { data } = await axios.post(`${backendUrl}/api/admin/login`, { email, password });

                if (data.success) {
                    setAToken(data.token);
                    localStorage.setItem("adminToken", data.token); // Save token to localStorage
                    toast.success("Logged in successfully!");

                    navigate("/admin-dashboard"); // Redirect to dashboard
                } else {
                    toast.error(data.message || "Login failed");
                }
            }
        } catch (error) {
            console.error("Error logging in:", error);
            toast.error("An error occurred during login");
        }
    };

    return (
        <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center">
            <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96">
                <p className="text-2xl font-semibold m-auto">
                    <span className="text-primary">{state} Login</span>
                </p>

                <div className="w-full">
                    <p>Email</p>
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        className="border border-[#DADADA] rounded w-full p-2 mt-1"
                        type="email"
                        required
                    />
                </div>

                <div className="w-full">
                    <p>Password</p>
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        className="border border-[#DADADA] rounded w-full p-2 mt-1"
                        type="password"
                        required
                    />
                </div>

                <button className="bg-primary text-white w-full py-2 rounded-md text-base" type="submit">
                    Login
                </button>

                {state === "Admin" ? (
                    <p>
                        Doctor Login? <span onClick={() => setState("Doctor")} className="text-primary underline cursor-pointer">Click here</span>
                    </p>
                ) : (
                    <p>
                        Admin Login? <span onClick={() => setState("Admin")} className="text-primary underline cursor-pointer">Click here</span>
                    </p>
                )}
            </div>
        </form>
    );
};

export default Login;
