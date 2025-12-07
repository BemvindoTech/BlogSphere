import React from "react";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
function Contact() {
    return (
        <>
            <Header />
            <section className="mt-5">
                <div className="container">
                    <div className="row">
                        <div className="col-md-9 mx-auto text-center">
                            <h1 className="fw-bold">Contacts</h1>
                        </div>
                    </div>
                </div>
            </section>
            <section className="pt-4">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-9 mx-auto">
                            <iframe
                                className="w-100 h-300 grayscale"
                                src="https://www.google.com/maps/@14.7719074,-17.4097391,17.74z?entry=ttu&g_ep=EgoyMDI1MTIwMi4wIKXMDSoASAFQAw%3D%3D"
                                height={500}
                                style={{ border: 0 }}
                                aria-hidden="false"
                                tabIndex={0}
                            />
                            <div className="row mt-5">
                                <div className="col-sm-6 mb-5 mb-sm-0">
                                    <h3>Adresse</h3>
                                    <address>Dakar - Sénégal </address>
                                    <p>
                                        Téléphone :{" "}
                                        <a href="#" className="text-reset">
                                            <u>77 777 77 77</u>
                                        </a>
                                    </p>
                                    <p>
                                        Email:{" "}
                                        <a  className="text-reset">
                                            <u>bienvenumendy1@gmail.com</u>
                                        </a>
                                    </p>
                                    <p>
                                        Disponible: du Vendredi au Dimanche
                                        <br />
                                        9:30  - 20:00
                                    </p>
                                </div>
                                {/*<div className="col-sm-6">*/}
                                {/*    <h3>Contact Information </h3>*/}
                                {/*    */}
                                {/*    <address>750 Sing Sing Rd, Horseheads, NY, 14845</address>*/}
                                {/*    <p>*/}
                                {/*        Téléphone{" "}*/}
                                {/*        <a href="#" className="text-reset">*/}
                                {/*            <u>+221 77 241 71 26</u>*/}
                                {/*        </a>*/}
                                {/*    </p>*/}
                                {/*    <p>*/}
                                {/*        Email:{" "}*/}
                                {/*        <a href="#" className="text-reset">*/}
                                {/*            <u>bienvenumendy1@gmail.com</u>*/}
                                {/*        </a>*/}
                                {/*    </p>*/}
                                {/*    <p>*/}
                                {/*        Disponible: du lundi au Vendredi*/}
                                {/*        <br />*/}
                                {/*        9:30  - 20:00*/}
                                {/*    </p>*/}
                                {/*</div>*/}
                            </div>
                            <hr className="my-5" />
                            <div className="row mb-5">
                                <div className="col-12">
                                    <h2 className="fw-bold">Send us a message</h2>
                                    <p>Please fill in the form below and we will contact you very soon. Your email address will not be published.</p>
                                    {/* Form START */}
                                    <form className="contact-form" id="contact-form" name="contactform" method="POST">
                                        {/* Main form */}
                                        <div className="row">
                                            <div className="col-md-6">
                                                {/* name */}
                                                <div className="mb-3">
                                                    <input required="" id="con-name" name="name" type="text" className="form-control" placeholder="Name" />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                {/* email */}
                                                <div className="mb-3">
                                                    <input required="" id="con-email" name="email" type="email" className="form-control" placeholder="E-mail" />
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                {/* Subject */}
                                                <div className="mb-3">
                                                    <input required="" id="con-subject" name="subject" type="text" className="form-control" placeholder="Subject" />
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                {/* Message */}
                                                <div className="mb-3">
                                                    <textarea required="" id="con-message" name="message" cols={40} rows={6} className="form-control" placeholder="Message" defaultValue={""} />
                                                </div>
                                            </div>
                                            {/* submit button */}
                                            <div className="col-md-12 text-start">
                                                <button className="btn btn-primary w-100" type="submit">
                                                    Send Message <i className="fas fa-paper-plane"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                    {/* Form END */}
                                </div>
                            </div>
                        </div>{" "}
                        {/* Col END */}
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}

export default Contact;
