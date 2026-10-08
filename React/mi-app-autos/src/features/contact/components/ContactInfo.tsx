import "./ContactInfo.css";

const ContactInfo = () => {
  return (
    <div className="contact-copy">
      <p className="eyebrow">Contacto</p>
      <h1>Conversemos sobre su próximo auto</h1>
      <p>
        Complete el formulario para practicar la captura y validación de datos.
        El envío se simula en el navegador: no llega a un vendedor.
      </p>

      <div className="contact-details">
        <p>
          <strong>Atención</strong>
          <br />
          Proyecto académico de demostración
        </p>
        <p>
          <strong>Ubicación</strong>
          <br />
          Costa Rica
        </p>
      </div>
    </div>
  );
};

export default ContactInfo;
