import {url} from "../utils/constantes";
import axios from "axios";
import {useState, useEffect} from 'react';
import {useDispatch} from "react-redux";
import {connexion} from "../actions";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    //const isLogged = useSelector(state => state.isLogged);
    const dispatch = useDispatch();

    const [errorLogin, setErrorLogin] = useState(false);

    const validateForm = () => {
        return username.length > 0 && password.length > 0;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrorLogin(false);

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
            })
            .catch(function (error) {
                console.log(error);
                setErrorLogin(true);
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

    return <div className="container">
        <br/>
        <br/>
        <h2>Connexion</h2>
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
                <button type="submit" disabled={!validateForm()} className="btn btn-primary">Connexion</button>
            </div>
            <br/>
            <br/>
            {errorLogin ? <div className="alert alert-danger" role="alert">
                Nom d'utlisateur ou mot de passe incorrect
            </div> : <span/>}
        </form>
    </div>;
};

export default Login;