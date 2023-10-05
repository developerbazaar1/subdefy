import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { OpenRoute } from "../utility/ApiServices";
import { ToastContainer, toast } from "react-toastify";
function Newsletter() {
  const { register, formState, handleSubmit, reset } = useForm();

  const { errors } = formState;
  const NewsLetterSubmit = (data, e) => {
    e.preventDefault();
    // console.log(data);
    OpenRoute.newsLetter({ email: data.SubscribeNewsLetter })
      .then((response) => {
        // console.log(response.data.message);
        toast.success(response.data.message);
      })
      .catch((error) => {
        toast.success(error.message);
      })
      .finally(() => {
        reset();
      });
  };

  return (
    <section className="newsletter">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6 text-center">
            <div className="main-heading">
              <motion.h2
                animate={{ opacity: 0, scale: 0.3 }}
                transition={{
                  duration: 1.5,
                  delay: 0.4,
                }}
                initial={{ opacity: 0, scale: 0.3 }}
                whileInView={{ opacity: 1, scale: 1 }}
              >
                Stay in the loop
              </motion.h2>

              <motion.p
                animate={{ opacity: 0 }}
                transition={{
                  duration: 3,
                  delay: 0.6,
                }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
              >
                Keep up to date with our Subdefy <br /> Newsetter. We won't spam
                you
              </motion.p>
              <form onSubmit={handleSubmit(NewsLetterSubmit)}>
                <div className="newsletter-box d-flex justify-content-center mt-5">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Name@company.com"
                    id="SubscribeNewsLetter"
                    {...register("SubscribeNewsLetter", {
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid Email Address",
                      },
                      required: {
                        value: true,
                        message: "Email is Required",
                      },
                    })}
                  />

                  <button className="btn btn-submit" type="submit">
                    Submit
                  </button>
                </div>{" "}
                <div className="error-div news-error">
                  {errors?.SubscribeNewsLetter?.message}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Newsletter;
