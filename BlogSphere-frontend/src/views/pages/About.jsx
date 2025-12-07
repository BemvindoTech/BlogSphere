import React from "react";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
function About() {
    return (
        <>
            <Header />

            <section className="pt-4 pb-0">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-9 mx-auto">
                            <h2 className="mb-2 text-center">BlogSphere</h2>
                            <h3>Contexte</h3>
                            <p>
                                De nombreuses personnes souhaitent partager leurs idées, expériences ou tutoriels techniques.
                                BlogSphere est une plateforme de blogging simple, élégante et collaborative, permettant à
                                chaque utilisateur de publier, commenter, liker et consulter des articles avec une expérience
                                fluide façon Medium.
                            </p>
                            <h3 className="mt-4">Objectif :</h3>
                            <p>Développer une plateforme web qui permet aux utilisateurs de :</p>
                            <ul>
                                <li>Écrire et publier des articles avec un éditeur riche.</li>
                                <li>Commenter,éoingler et liker les articles.</li>
                                <li>Consulter les articles d’autres utilisateurs.</li>
                                <li>Afficher un profil public avec liste des publications.</li>
                                <li>Suivre la popularité des articles (likes, vues).</li>
                            </ul>
                            <h3 className="mb-3 mt-5">Technologies</h3>
                            <ul>
                                <li>Backend : Django.</li>
                                <li>Frontend : React.</li>
                                <li>Base de donnée : PostgreSQL.</li>
                                <li>La formation Apprendre React de Grafikart.</li>
                                <li>Hébergement : Vercel (frontend) + Render ou Heroku (backend).</li>

                            </ul>
                            <h3 className="mb-3 mt-5">Outils et références</h3>
                            <ul>
                                <li>Documentation officiel de Django.</li>
                                <li>Documentation officiel de React.</li>
                                <li>La formation complete Django de Docstring.</li>
                                <li>La formation Apprendre React de Grafikart.</li>
                                <li>Django (DRF) & React Authentication - Register, Login, Logout, Database, Profile. de Desphixs</li>
                                <li>Django and React Blog Tutorial de Desphixs</li>

                            </ul>
                        </div>{" "}
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}
export default About;
