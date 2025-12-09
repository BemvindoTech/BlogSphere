import React, {useState} from "react";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import {Link, useNavigate} from "react-router-dom";
import {useAuthStore} from "../../store/auth";
import { register} from "../../utils/auth";

function Register() {
    const [bioData, setBioData] = useState(false);
    const [isLoading, setIsloading] = useState(false);
    const navigate = useNavigate();

    const handleBioDataChange = (event) => {
        setBioData({
            ...bioData,
            [event.target.name]: event.target.value,
        });
    };

    const resetForm = () =>{
        setBioData({
            full_name: "",
            email: "",
            password: "",
            password2: "",
        });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setIsloading(true);

        const {error} = register(bioData.full_name,bioData.email,bioData.password,bioData.password2);
        if (error){
            alert(JSON.stringify(error));
            resetForm();
        }else{

            navigate("/");
        }

        setIsloading(false);
    };
    return (
        <>
            <Header />
            <section className="container d-flex flex-column vh-100" style={{ marginTop: "150px" }}>
                <div className="row align-items-center justify-content-center g-0 h-lg-100 py-8">
                    <div className="col-lg-5 col-md-8 py-8 py-xl-0">
                        <div className="card shadow">
                            <div className="card-body p-6">
                                <div className="mb-4">
                                    <h1 className="mb-1 fw-bold">Inscription</h1>
                                    <span>
                                        Vous avez deja un compte?
                                        <Link to="/login/" className="ms-1">
                                           Connexion
                                        </Link>
                                    </span>
                                </div>
                                {/* Form */}
                                <form onSubmit={handleRegister} className="needs-validation" noValidate="">
                                    {/* Username */}
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">
                                            Nom complet
                                        </label>
                                        <input onChange={handleBioDataChange} value={bioData.full_name} type="text" id="full_name" className="form-control" name="full_name" placeholder="John Doe" required="" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">
                                            Adresse email
                                        </label>
                                        <input onChange={handleBioDataChange} value={bioData.email} type="email" id="email" className="form-control" name="email" placeholder="johndoe@gmail.com" required="" />
                                    </div>

                                    {/* Password */}
                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label">
                                            Mot de passe
                                        </label>
                                        <input onChange={handleBioDataChange} value={bioData.password} type="password" id="password" className="form-control" name="password" placeholder="**************" required="" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label">
                                            Confirmer votre mot de passe
                                        </label>
                                        <input onChange={handleBioDataChange} value={bioData.password2} type="password" id="password" className="form-control" name="password2" placeholder="**************" required="" />
                                    </div>
                                    <div>
                                        <div className="d-grid">
                                            {isLoading === true ? (
                                                <button disabled type="submit" className="btn btn-primary">
                                                    en cour <i className="fas fa-spinner fa-spin"></i>
                                                </button>
                                                 ) : (
                                                <button type="submit" className="btn btn-primary">
                                                    S'incrire <i className="fas fa-user-plus"></i>
                                                </button>
                                                )}
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}

export default Register;
