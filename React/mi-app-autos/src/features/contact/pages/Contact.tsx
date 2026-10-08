import ContactForm from "../components/ContactForm";
import ContactInfo from "../components/ContactInfo";
import "./Contact.css";

const Contact = () => {
  return (
    <section className="container contact-page">
      <ContactInfo />
      <ContactForm />
    </section>
  );
};

export default Contact;
