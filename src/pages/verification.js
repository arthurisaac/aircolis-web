import React, {Component} from "react";
import axios from "axios";
import {url} from "../utils/constantes";
import DataTable, { defaultThemes } from 'react-data-table-component';
import "../App.css";

class Verification extends Component {
    state = {
        users: [],
        filterText: "",
        paginationResetDefaultPage: false
    };

    componentDidMount() {
        axios.get(url + "users")
            .then((response) => {
                this.setState({
                    users: response.data
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    subscriptionRow = (user, index,) => {
        const { subscription, firstname, lastname, uid } = user;
        const {users} = this.state;
        return <div>
            <input type="checkbox" name="subscription" checked={subscription}
                      onChange={() => {
                          const statut = (subscription === 1) ? "Désactiver" : "Activer";
                          if (window.confirm(`${statut} souscription pour ${firstname} ${lastname}`)) {
                              let userLists = users;
                              userLists[index].subscription = (subscription === 1) ? 0 : 1;
                              this.setState({
                                  users: userLists
                              });
                          }
                          this.souscription(uid, (subscription === 1) ? 0 : 1);
                      }
                      }/> {subscription ? "Souscription active" : "Souscription non active"}
        </div>;
    };

    souscription = (uid, souscription) => {
        const data = JSON.stringify({
            'uid': uid,
            'subscription': souscription
        });
        const config = {
            method: 'post',
            url: `${url}activation/souscription`,
            headers: {
                'Content-Type': 'application/json'
            },
            data : data
        };
        axios(config)
            .then(function (response) {
                const data = response.data;
                console.log(data);
                if (data.success !== 1) {
                    alert("Une erreur s'est produite");
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    verificationRow = (user, index) => {
        const {users} = this.state;
        const { uid, isVerified, firstname, lastname } = user;
        // return (subscription === 1) ? <input type="checkbox" checked={true} /> : <input type="checkbox" checked={false} />
        return <div>
            <input type="checkbox" name={"isVerified"} value={isVerified} checked={isVerified}
                   onChange={() => {
                       const statut = isVerified ? "non vérifié" : "vérifié";
                       if (window.confirm(`Marquer comme ${statut} le compte de ${firstname} ${lastname} ?`)) {
                           let userLists = users;
                           userLists[index].isVerified = !isVerified;
                           this.setState({
                               users: userLists
                           });
                       }
                       this.verification(uid, !isVerified);
                   }
                   }/> {isVerified ? "Vérifié" : "Compte non vérifié"}
        </div>;
    };

    verification = (uid, isVerified) => {
        const data = JSON.stringify({
            'uid': uid,
            'verification': isVerified
        });
        const config = {
            method: 'post',
            url: `${url}activation/compte`,
            headers: {
                'Content-Type': 'application/json'
            },
            data : data
        };
        axios(config)
            .then(function (response) {
                const data = response.data;
                console.log(data);
                if (data.success !== 1) {
                    alert("Une erreur s'est produite");
                }
            })
            .catch(function (error) {
                console.log(error);
                alert("Une erreur s'est produite " + JSON.stringify(error));
            });
    };

    expandedRow = (data) => {
        const user = data.data;
        console.log(user);
        //console.log(new Date());
        return <div className="users-datatable--expanded">
            <div>Nom: <span>{user.firstname}</span></div>
            <div>Prénom: <span>{user.lastname}</span></div>
            <div>Email: <span>{user.email}</span></div>
            <div>Phone: <span>{user.phone}</span></div>
            <div>Dernière connexion: <span>{new Date(user.lastSignIn).toLocaleString()}</span></div>
            <div>ID: <span>{user.uid}</span></div>
        </div>
    };

    render() {

        const columns = [
            {name: "Nom", selector: "firstname", sortable: true,},
            {name: "Prénoms", selector: "lastname", sortable: true,},
            {name: "Vérification", selector: "isVerified", cell: (row, index) => this.verificationRow(row, index),},
            {name: "Souscription", selector: "subscription", cell: (row, index) => this.subscriptionRow(row, index),},
        ];
        const customStyles = {
            header: {
                style: {
                    minHeight: '56px',
                },
            },
            headRow: {
                style: {
                    borderTopStyle: 'solid',
                    borderTopWidth: '1px',
                    borderTopColor: defaultThemes.default.divider.default,
                },
            },
            headCells: {
                style: {
                    '&:not(:last-of-type)': {
                        borderRightStyle: 'solid',
                        borderRightWidth: '1px',
                        borderRightColor: defaultThemes.default.divider.default,
                    },
                },
            },
            cells: {
                style: {
                    '&:not(:last-of-type)': {
                        borderRightStyle: 'solid',
                        borderRightWidth: '1px',
                        borderRightColor: defaultThemes.default.divider.default,
                    },
                },
            },
        };

        return <div className="container">
            <br/>
            <h1 className="display-4">Demande de vérification de compte</h1>
            <br/>
            <div className="card">
                <DataTable
                    //title="Utilisateurs"
                    columns={columns}
                    pagination
                    customStyles={customStyles}
                    dense
                    highlightOnHover
                    expandableRows
                    expandableRowsComponent={this.expandedRow}
                    expandableRowDisabled={row => row.disabled}
                    data={this.state.users}/>
            </div>
        </div>;
    }
}

export default Verification;