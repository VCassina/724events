// import PropTypes from "prop-types";
// import { getMonth } from "../../helpers/Date";

// import "./style.scss";

// const EventCard = ({
//   imageSrc,
//   imageAlt,
//   date = new Date(),
//   title,
//   label,
//   small = false,
//   ...props
// }) => (
  
//     <div
//       data-testid="card-testid"
//       className={`EventCard${small ? " EventCard--small" : ""}`}
//       {...props}
//     >
//       <div className="EventCard__imageContainer">
//         <img data-testid="card-image-testid" src={imageSrc} alt={imageAlt} />
//         <div className="EventCard__label">{label}</div>
//       </div>
//       <div className="EventCard__descriptionContainer">
//         <div className="EventCard__title">{title}</div>
//         <div className="EventCard__month">{getMonth(date)}</div>
//       </div>
//     </div>
//   );




// EventCard.propTypes = {
//   imageSrc: PropTypes.string.isRequired,
//   imageAlt: PropTypes.string,
//   date: PropTypes.instanceOf(Date).isRequired,
//   title: PropTypes.string.isRequired,
//   small: PropTypes.bool,
//   label: PropTypes.string.isRequired,
// };

// EventCard.defaultProps = {
//   imageAlt: "image",
//   small: false,
// }

// // console.log(imageSrc);
// // console.log(title);
// // console.log(label);

// export default EventCard;

/* !! IDENTIFICATION DES SOUCIS !! */

/* 

Je pense que ça vient de la gestion des props car ce message revient et si je règle le soucis, pourquoi pas ça marche.
Ca reste cloisonné à la pagination, le reste est fonctionnel.

Est-ce vraiment ça qui est lié à mon soucis ? C'est quand même étrange qu'UN props fonctionne et que ce soit celui qui n'est pas concerné par ce genre de message d'erreur, clin d'oeil.

Warning: Failed prop type: The prop `imageSrc` is marked as required in `EventCard`, but its value is `undefined`.
EventCard@http://localhost:3000/static/js/bundle.js:303:7
Page@http://localhost:3000/static/js/bundle.js:2980:70
DataProvider@http://localhost:3000/static/js/bundle.js:2708:7
App

*/


import React from "react";
import PropTypes from "prop-types";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const EventCard = (props) => {
  const { imageSrc, imageAlt, date = new Date(), title, label, small = false } = props;

// console.log(imageSrc);
// console.log(title);
// console.log(label);

  return (
    <div
      data-testid="card-testid"
      className={`EventCard${small ? " EventCard--small" : ""}`}
      {...props}
    >
      <div className="EventCard__imageContainer">
        <img data-testid="card-image-testid" src={imageSrc} alt={imageAlt} />
        <div className="EventCard__label">{label}</div>
      </div>
      <div className="EventCard__descriptionContainer">
        <div className="EventCard__title">{title}</div>
        <div className="EventCard__month">{getMonth(date)}</div>
      </div>
    </div>
  );
};

EventCard.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  imageAlt: PropTypes.string,
  date: PropTypes.instanceOf(Date).isRequired,
  title: PropTypes.string.isRequired,
  small: PropTypes.bool,
  label: PropTypes.string.isRequired,
};

EventCard.defaultProps = {
  imageAlt: "image",
  small: false,
};

export default EventCard;
