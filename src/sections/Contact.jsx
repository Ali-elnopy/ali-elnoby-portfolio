import React from "react";
import emailjs from "@emailjs/browser";
import { useRef, useState } from "react";
import TitleHeader from "../components/TitleHeader";

const Contact = () => {
  const formRef = useRef(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await emailjs.sendForm(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY,
      );
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      console.log("Error sending email:", error);
    } finally {
      setLoading(false);
    }
  };
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  return (
    <section id="contact" className="flex-center section-padding">
      <div className="w-full h-full md:px-10 px-5">
        <TitleHeader
          title="Get in Touch – Let’s Connect"
          sub="💬 Have questions or ideas? Let’s talk! 🚀"
        />

        <div className="w-[80%]  mt-16 mx-auto">
          <div className="xl:col-span-5">
            <div className="flex-center card-border rounded-xl p-10">
              <form
                action=""
                className="w-full flex flex-col gap-7"
                ref={formRef}
                onSubmit={handleSubmit}
              >
                <div>
                  <label htmlFor="name">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="What’s your good name?"
                    className="transition-color duration-300 focus:outline-none focus:ring-2 focus:ring-white-500"
                  />
                </div>

                <div>
                  <label htmlFor="name">Your Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="What’s your email address?"
                    className="transition-color duration-300 focus:outline-none focus:ring-2 focus:ring-white-500"
                  />
                </div>

                <div>
                  <label htmlFor="name">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows="5"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="How can I help you?"
                    className="transition-color duration-300 focus:outline-none focus:ring-2 focus:ring-white-500"
                  />
                </div>

                <button type="submit" disabled={loading}>
                  <div className="cta-button group">
                    <div className="bg-circle" />
                    <p className="text">
                      {loading ? "Sending..." : "Send Message"}
                    </p>
                    <div className="arrow-wrapper">
                      <img src="/images/arrow-down.svg" alt="arrow" />
                    </div>
                  </div>
                </button>
              </form>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
