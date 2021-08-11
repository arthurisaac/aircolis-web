import {url} from "../utils/constantes";
import axios from "axios";
import {useState, useEffect} from 'react';
import {useDispatch} from "react-redux";
import {connexion} from "../actions";
import "../App.css";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    //const isLogged = useSelector(state => state.isLogged);
    const dispatch = useDispatch();

    const [errorLogin, setErrorLogin] = useState(false);

    const validateForm = () => {
        return username.length > 0 && password.length > 0;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrorLogin(false);
        setLoading(true);

        const data = JSON.stringify({
            'username': username,
            'password': password
        });
        const config = {
            method: 'post',
            url: `${url}users/login`,
            headers: {
                'Content-Type': 'application/json'
            },
            data : data
        };
        axios(config)
            .then(function (response) {
                const data = response.data;
                if (data.success === 1) {
                    sessionStorage.setItem('success', true);
                    dispatch(connexion());
                    //alert("Welcome");
                    window.location.reload();
                } else {
                    setErrorLogin(true);
                }
                setLoading(false);
            })
            .catch(function (error) {
                console.log(error);
                setErrorLogin(true);
                setLoading(false);
            });
    };

    useEffect(() => {
        if (sessionStorage.getItem('success')) {
            dispatch(connexion());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /*useEffect(() => {
        if (isAuthenticated) {
            history.push("/");
        }
    }, );*/

    return <div className="login-page">
        <div  className="container">
            <div className="login-container">
                <h2>CONNEXION</h2>
                <br/>
                <form action="#" method="post" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Identifiant</label>
                        <input type="text" placeholder="identifiant" value={username}
                               onChange={e => setUsername(e.target.value)} className="form-control"/>
                    </div>
                    <div className="form-group">
                        <label>Mot de passe</label>
                        <input type="password" placeholder="Mot de passe" value={password}
                               onChange={e => setPassword(e.target.value)} className="form-control"/>
                    </div>
                    <br/>
                    <div className="form-group">
                        {loading ? <div className="spinner-border text-primary" role="status">
                            <span className="sr-only"/>
                        </div> :<button type="submit" disabled={!validateForm()} className="btn btn-primary">Connexion</button> }
                    </div>
                    <br/>
                    {errorLogin ? <div className="alert alert-danger" role="alert">
                        Nom d'utlisateur ou mot de passe incorrect
                    </div> : <span/>}
                </form>
            </div>
        </div>

    </div>;
};

export default Login;