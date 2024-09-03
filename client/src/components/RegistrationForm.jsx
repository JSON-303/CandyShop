import { useState } from 'react';
import { createUserService } from '../services/user.service';
import { useNavigate } from 'react-router-dom';

const RegistrationForm = () => {
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const updateUserData = (e) => {
        const { name, value } = e.target;
        setUserData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const createUser = async (e) => {
        e.preventDefault();
        try {
            await createUserService(userData);
            setUserData({
                username: '',
                email: '',
                password: '',
                confirmPassword: '',
            });
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
        <div className="authContainer">
            <div className="formContainer">
                <form onSubmit={createUser} className="registrationFormStyle">
                    <h2>Registration</h2>
                    {errors.username && <p className="errorStyle">{errors.username.message}</p>}
                    <label>
                        Username:
                        <input
                            type="text"
                            name="username"
                            value={userData.username}
                            onChange={updateUserData}
                        />
                    </label>
                    {errors.username && <p className="errorStyle">{errors.email.message}</p>}
                    <label>
                        Email:
                        <input
                            type="text"
                            name="email"
                            value={userData.email}
                            onChange={updateUserData}
                        />
                    </label>
                    {errors.password && <p className="errorStyle">{errors.password.message}</p>}
                    <label>
                        Password:
                        <input
                            type="password"
                            name="password"
                            value={userData.password}
                            onChange={updateUserData}
                        />
                    </label>
                    {errors.confirmPassword && <p className="errorStyle">{errors.confirmPassword.message}</p>}
                    <label>
                        Confirm Password:
                        <input
                            type="password"
                            name="confirmPassword"
                            value={userData.confirmPassword}
                            onChange={updateUserData}
                        />
                    </label>
                    <div>
                        <input
                            type="submit"
                            value="Complete"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default RegistrationForm;
