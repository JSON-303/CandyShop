import { useState } from 'react';
import { loginUserService } from '../services/user.service';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

    const [loginData, setLoginData] = useState({
        username: '',
        password: '',
    });

    const updateLoginData = (e) => {
        const { name, value } = e.target;
        setLoginData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const loginUser = async (e) => {
        e.preventDefault();
        try {
            await loginUserService({ username: loginData.username, password: loginData.password });
            navigate("/candyshop/candies");
        } catch (error) {
            if (error.response && error.response.data) {
                setErrors(error.response.data.errors);
            } else {
                console.error("Error:", error);
            }
        }
    };

    return (
        <form onSubmit={loginUser} className="loginFormStyle">

            {/* -- LOGIN FORM -- */}
            <h2>Login</h2>
            {errors.username && <p className="errorStyle">{errors.username.message}</p>}
            <label>
                Username:
                <input
                    type="text"
                    name="username"
                    value={loginData.username}
                    onChange={updateLoginData}
                />
            </label>
            {errors.password && <p className="errorStyle">{errors.password.message}</p>}
            <label>
                Password:
                <input
                    type="password"
                    name="password"
                    value={loginData.password}
                    onChange={updateLoginData}
                />
            </label>
            <div>
                <input
                    type="submit"
                    value="Login"
                />
            </div>
        </form>
    );
}

export default LoginForm;
