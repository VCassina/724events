import { useCallback, useState } from "react"; // Gestion de callBack qui s'assure d'être rappelé uniquement en cas de changement (ok).
import PropTypes from "prop-types";
import Field, { FIELD_TYPES } from "../../components/Field";
import Select from "../../components/Select";
import Button, { BUTTON_TYPES } from "../../components/Button";

const mockContactApi = () => new Promise((resolve) => { setTimeout(resolve, 1000); }) // Simulation d'une chargement avant réussite de communication avec l'API ! (J'imagine).

const Form = ({ onSuccess, onError }) => { // Reçoit des props qui réfèrent réciproquement au cas de reussite ou d'echec (de contact à l'API ? De quoi ?).
  
  const [sending, setSending] = useState(false); // La variable indiquant si on est en train d'envoyer ou non notre requête. Sert surtout pour les retours et quoi afficher, sentiment de feed-back UI.
  const sendContact = useCallback( // Notre gestion de callBack utilisée pour gérer l'envoie fetch en async et doit s'update lors de changement détecté.
    async (evt) => {
      evt.preventDefault();
      setSending(true); // On est en train d'envoyer.
      // We try to call mockContactApi.
      try {
        await mockContactApi();
        setSending(false);  // On a réussi à l'envoyer, on n'envoie plus.
        onSuccess(true);  // IL MANQUAIT LE CALL-BACK ici ! Il n'y avait rien et voila qu'aujourd'hui on y retrouve une modification de la valeur onSucces pour true, ce qui ouvrira la modale avec la confirmation d'envoie.
      } catch (err) {
        setSending(false); // On a échoué, on n'envoie plus.
        onError(err); // Si une erreur a été trouvée, elle sera fourni en value de onError, utilisé dans l'affichage ensuite par le parent pour l'ouverture modale.
      }
    },
    [onSuccess, onError]
  );


  return (
    <form onSubmit={sendContact}>
      <div className="row">
        <div className="col">
          <Field placeholder="" label="Nom" />
          <Field placeholder="" label="Prénom" />
          <Select
            selection={["Personel", "Entreprise"]}
            onChange={() => null}
            label="Personel / Entreprise"
            type="large"
            titleEmpty
          />
          <Field placeholder="" label="Email" />
          <Button type={BUTTON_TYPES.SUBMIT} disabled={sending}>
            {sending ? "En cours" : "Envoyer"}
          </Button>
        </div>
        <div className="col">
          <Field
            placeholder="message"
            label="Message"
            type={FIELD_TYPES.TEXTAREA}
          />
        </div>
      </div>
    </form>
  );
};

Form.propTypes = {
  onError: PropTypes.func,
  onSuccess: PropTypes.func,
}

Form.defaultProps = {
  onError: () => null,
  onSuccess: () => null,
}

export default Form;
