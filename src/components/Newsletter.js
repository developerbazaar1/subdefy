import { motion } from "framer-motion";

function Newsletter() {
 
    
    return (
        <section className="newsletter">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-6 text-center">
                        <div className="main-heading">

                            <motion.h2
                                animate={{ opacity: 0, scale: .3 }}
                                    transition={{
                                        duration: 1.5,
                                        delay: 0.4,
                                        
                                    }}
                                    initial={{ opacity: 0, scale: .3 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                >
                                    Stay in the loop
                            </motion.h2>

                            <motion.p
                                animate={{ opacity: 0,  }}
                                    transition={{
                                        duration: 3,
                                        delay: 0.6,
                                        
                                    }}
                                    initial={{ opacity: 0,  }}
                                    whileInView={{ opacity: 1,  }}
                                >
                                    Keep up to date with our Subdefy <br/> Newsetter. We won't spam you
                            </motion.p>

                            
                            <div className="newsletter-box d-flex justify-content-center mt-5">
                                <input type="email" className="form-control" placeholder="Name@company.com" required />
                                <button className="btn btn-submit" type="button">Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Newsletter;


