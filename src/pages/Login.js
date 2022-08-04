import { Link, useNavigate } from "react-router-dom";
import {Button} from "react-bootstrap";

export const Login = () =>{

    let navigate = useNavigate();

    return(
        <div className="text-center center login">
            <h2>Login to Mark Logic</h2>
            <form>
                <p>
                    <label>Username or email address</label><br/>
                    <input type="email" name="first_name" required />
                </p>
                <p>
                    <label>Password</label>
                    <Link to="/"><label className="right-label">Forget password?</label></Link>
                    <br/>
                    <input type="password" name="password" required />
                </p>
                <p>
                    <Button  className="login-btn" variant="dark" onClick={()=>navigate("/home")}>Login</Button>
                </p>
            </form>
            <footer>
                <p><Link to="/">Back to Homepage</Link>.</p>
            </footer>
        </div>
    );
}
