import React, { useState, useEffect } from "react";
import EventCard from "../../components/EventCard";
import Select from "../../components/Select";
import { useData } from "../../contexts/DataContext";
import Modal from "../Modal";
import ModalEvent from "../ModalEvent";

import "./style.css";

const PER_PAGE = 9;

const EventList = () => {
  const { data, error } = useData();
  const [type, setType] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredEvents, setFilteredEvents] = useState([]); // Désormais un useState, nécéssaire pour s'adapter et filtrer en temps réel.
  const changeType = (newType) => {
    setCurrentPage(1);
    setType(newType);
  };
const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => { // Utilisation d'un useEffect nécéssaire pour faire fonctionner le filtre.
    const startIndex = (currentPage - 1) * PER_PAGE; // 0 ou 9, respectivement le début d'index de la page 1 et 2. Marche à l'infini.
    const endIndex = startIndex + PER_PAGE; // La fin de l'index respectif au début, respectivement 8 et 18.
    const filtered = type // variable qui contient dans un tableau les éléments filtrés.
      ? data?.events.filter((event) => event.type === type)
      : data?.events || [];
    const paginatedEvents = filtered.slice(startIndex, endIndex); // On utilise uniquement ceux qui correspondent à la page en cours ! 
    // > CETTE FACON DE FAIRE ne sépare plus en page mais les regroupent s'ils rentrent tous sur une page.
    setFilteredEvents(paginatedEvents); // On change les évenements filtrés par rapport au résultat des éléments filtrés sur la page :) !

    const filteredCount = filtered.length;  // La taille de filtered, qui sert de référence pour le nombre d'item récolté PAR filtre.
    const calculatedPageNumber = Math.ceil(filteredCount / PER_PAGE); // Le nombre de page, on prend filteredCount divisé par le nb d'items par page (directement .lenght ne marchait pas). Pourquoi ?
    setPageNumber(calculatedPageNumber); // En cas de changement, on applique calculatedPageNumber comme valeur :) ! Et voila !
  }, [type, data?.events, currentPage]);  // En cas de changement de DB (quand on a fini de la charger), ça change, quand on change le type, bien sûr et quand on change de page également !

  const typeList = new Set(data?.events.map((event) => event.type));
  return (
    <>
      {error && <div>An error occurred</div>}
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
                    imageSrc={event.cover}  // DOUBLONS dans le JSON, donc ça marche, j'ai vérifié, faut juste correctement renseigner le JSON.
                    title={event.title} // DOUBLONS dans le JSON, donc ça marche, j'ai vérifié, faut juste correctement renseigner le JSON.
                    date={new Date(event.date)}
                    label={event.type}
                  />
                )}
              </Modal>
            ))}
          </div>
           <div className="Pagination">
            {Array.from({ length: pageNumber }, (_, index) => (
              <a href="#nos-realisations"
              // eslint-disable-next-line react/no-array-index-key
                key={index + 1}
                className={currentPage === index + 1 ? "active" : ""}
                onClick={() => setCurrentPage(index + 1 )}
              >
                {index + 1}
              </a>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default EventList;
