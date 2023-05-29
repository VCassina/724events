import { useState } from "react";
import EventCard from "../../components/EventCard";
import Select from "../../components/Select";
import { useData } from "../../contexts/DataContext";
import Modal from "../Modal";
import ModalEvent from "../ModalEvent";

import "./style.css";

const PER_PAGE = 9;

const EventList = () => { 
  
  const { data, error } = useData();  // Récupération de data et les événements d'erreurs.
  const [type, setType] = useState(); // type sera notre valeur de choix par l'utilisateur concernant le filtre à appliquer.
  const [currentPage, setCurrentPage] = useState(1); // La page actuelle affichée, elles regroupent 9 événements par page, commence à 1.
  
  const filteredEvents = (  // Les éléments filtrés :
    (!type                  // Est-ce que type est défini ?
      ? data?.events        // Oui, alors data?.events.
      : data?.events) || [] // Non, alors data?.events sachant que la valeur par défaut sera de "tableau vide".
  ).filter((_, index) => {  // Maintenant on va filtrer les éléments séléctés qui proviennent de la base de données (ou sont vides dans le pire des cas mais qui ne fera pas crash l'application).
    // Index n'est pas utilisé mais est là pour ne pas faire planter la fonction de rappel, il est la pour consolider la "structure".
    if (    
      (currentPage - 1) * PER_PAGE <= index &&  // Est-ce que notre élément en cours est
      PER_PAGE * currentPage > index
    ) {
      return true;
    }
    return false;
  });
  const changeType = (evtType) => {
    setCurrentPage(1);
    setType(evtType);
  };
  const pageNumber = Math.floor((filteredEvents?.length || 0) / PER_PAGE) + 1;
  const typeList = new Set(data?.events.map((event) => event.type));
  return (
    <>
      {error && <div>An error occured</div>}
      {data === null ? (
        "loading"
      ) : (
        <>
          <h3 className="SelectTitle">Catégories</h3>
          <Select
            selection={Array.from(typeList)}
            onChange={(value) => (value ? changeType(value) : changeType(null))}
          />
          <div id="events" className="ListContainer">
            {filteredEvents.map((event) => (
              <Modal key={event.id} Content={<ModalEvent event={event} />}>
                {({ setIsOpened }) => (
                  <EventCard
                    onClick={() => setIsOpened(true)}
                    imageSrc={event.cover}
                    title={event.title}
                    date={new Date(event.date)}
                    label={event.type}
                  />
                )}
              </Modal>
            ))}
          </div>
          <div className="Pagination">
            {[...Array(pageNumber || 0)].map((_, n) => (
              // eslint-disable-next-line react/no-array-index-key
              <a key={n} href="#events" onClick={() => setCurrentPage(n + 1)}>
                {n + 1}
              </a>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default EventList;
