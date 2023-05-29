// import { useState, useEffect } from "react";
// import EventCard from "../../components/EventCard";
// import Select from "../../components/Select";
// import { useData } from "../../contexts/DataContext";
// import Modal from "../Modal";
// import ModalEvent from "../ModalEvent";

// import "./style.css";

// const PER_PAGE = 9;

// const EventList = () => {
//   const { data, error } = useData();
//   const [type, setType] = useState();
//   // eslint-disable-next-line
//   const [currentPage, setCurrentPage] = useState(1);
//   const [filteredEvents, setFilteredEvents] = useState([]);
//   const changeType = (evtType) => {
//     setCurrentPage(1);
//     setType(evtType);
//   };

//     useEffect(() => { // Utilisation d'un useEffect nécéssaire pour faire fonctionner le filtre.
//     const filtered = type ? data?.events.filter((event) => event.type === type) : data?.events || []; // variable qui contient dans un tableau les éléments filtrés.
//     // const filtered = (
//     //   (!type
//     //     ? data?.events
//     //     : data?.events) || []
//     // ).filter((_, index) => {
//     //   if (
//     //     (currentPage - 1) * PER_PAGE <= index &&
//     //     PER_PAGE * currentPage > index
//     //   ) {
//     //     return true;
//     //   }
//     //   return false;
//     // });
//     console.log(filtered)
//     setFilteredEvents(filtered); // Et c'est cette liste qu'on applique désormais dans la variable d'état filteredEvents.
//     setCurrentPage(1); // On remet à la page 1, plus propre pour l'utilisateur.
//   }, [type, data?.events]); // Lors que type change, normal, on change de filtre et data?.events parce que J'IMAGINE QU'ELLE N'A PAS EU LE TEMPS DE CHARGER -
//   // Et donc qu'elle est chargée dans son état initial, à savoir le vide.

//   const pageNumber = Math.floor((filteredEvents?.length || 0) / PER_PAGE) + 1;
//   const typeList = new Set(data?.events.map((event) => event.type));
//   return (
//     <>
//       {error && <div>An error occured</div>}
//       {data === null ? (
//         "loading"
//       ) : (
//         <>
//           <h3 className="SelectTitle">Catégories</h3>
//           <Select
//             selection={Array.from(typeList)}
//             onChange={(value) => (value ? changeType(value) : changeType(null))}
//           />
//           <div id="events" className="ListContainer">
//             {filteredEvents.map((event) => (
//               <Modal key={event.id} Content={<ModalEvent event={event} />}>
//                 {({ setIsOpened }) => (
//                   <EventCard
//                     onClick={() => setIsOpened(true)}
//                     imageSrc={event.cover}
//                     title={event.title}
//                     date={new Date(event.date)}
//                     label={event.type}
//                   />
//                 )}
//               </Modal>
//             ))}
//           </div>
//           <div className="Pagination">
//             {[...Array(pageNumber || 0)].map((_, n) => (
//               // eslint-disable-next-line react/no-array-index-key
//               <a key={n} href="#events" onClick={() => setCurrentPage(n + 1)}>
//                 {n + 1}
//               </a>
//             ))}
//           </div>
//         </>
//       )}
//     </>
//   );
// };

// export default EventList;

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

  useEffect(() => { // Utilisation d'un useEffect nécéssaire pour faire fonctionner le filtre.
    const startIndex = (currentPage - 1) * PER_PAGE;
    const endIndex = startIndex + PER_PAGE;
    const filtered = type // variable qui contient dans un tableau les éléments filtrés.
      ? data?.events.filter((event) => event.type === type)
      : data?.events || [];
    const paginatedEvents = filtered.slice(startIndex, endIndex);
    setFilteredEvents(paginatedEvents);
  }, [type, data?.events, currentPage]);
  
  const pageNumber = Math.floor((filteredEvents?.length || 0) / PER_PAGE) + 1;
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
                    imageSrc={event.cover}  // EN ERREUR dans la console -- Les props ne sont pas biens transmis.
                    title={event.title} // EN ERREUR dans la console -- Les props ne sont pas biens transmis.
                    date={new Date(event.date)}
                    label={event.type} // Ici, seul le label change d'une page à l'autre, on va aller voir pourquoi. Ettt... Je n'ai pas trouvé pourquoi...
                    // Un soucis avec la façon dont les probs sont transmis ?
                  />
                )}
              </Modal>
            ))}
          </div>
           <div className="Pagination">
  {Array.from({ length: pageNumber }, (_, index) => (
    <a href="#event"
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
