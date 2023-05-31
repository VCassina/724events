import { useEffect, useState, useRef } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = data?.focus?.sort((evtA, evtB) =>
    new Date(evtA.date) > new Date(evtB.date) ? -1 : 1
  ) || [];    // Rajouter dans le conditionnement pour lui transmettre, par défaut, un état stable qui n'entrave pas le fonctionnement du slider et qui ne provoque pas de crash.
  const timeoutId = useRef(null); // Un useRef, il permet de faire ici "comme un let" qui permettra plus tard de réinitialiser le temps de setTimeout() 
  // - pour ne pas provoquer de "saccades"/"sauts" dans les changements de slides si jamais on décide de changer d'image.
  // Ce n'est pas forcement le comporter d'un useRef mais il peut être utilisé comme un let qui donc, sera réinitialisé à chaque changement onClick et correspondra au setTimeout().

  const nextCard = () => {  // Le même script à ce niveau là, fonction fléchée qui permet de changer de slide.
    setIndex((prevIndex) => (prevIndex === byDateDesc.length - 1 ? 0 : prevIndex + 1));
  };

  useEffect(() => { // Notre code permettant de contrôler le fameux setTimeout() lors d'un click sur une image et le remettre à zéro -
    //  AINSI que, comme initialiement prévu, permettre au compteur de fonctionner et d'afficher l'index en cours.
    clearTimeout(timeoutId.current);  // Notre timeoutId.current est clear s'il comportait un setTimeout.
    timeoutId.current = setTimeout(() => {  // On initie un nouveau setTimeout.
      nextCard(); // Qui suite à sa fin (naturelle), déclanchera nextCard, pas de changement sur le fonctionnement à ce niveau là.
    }, 5000);
  }, [index]);  // Si on change de slide naturellement, l'index changera, et artificiellement, c'est également le cas.

  const handleRadioChange = (currentIndex) => { // currentIndex (radioIdx que j'ai renommé), se voit modifier avec l'utilisation du state. Rien de changer non plus ici.
    setIndex(currentIndex);
  };

  return (
    <div className="SlideCardList">
      {byDateDesc.map((e, idx) => (
        <div
          key={e.id}
          className={`SlideCard SlideCard--${index === idx ? "display" : "hide"}`}
        >
          <img src={e.cover} alt="forum" />
          <div className="SlideCard__descriptionContainer">
            <div className="SlideCard__description">
              <h3>{e.title}</h3>
              <p>{e.description}</p>
              <div>{getMonth(new Date(e.date))}</div>
            </div>
          </div>
        </div>
      ))}
      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {byDateDesc.map((e, radioIdx) => (
            <input
              key={e.id}
              type="radio"
              name="radio-button"
              checked={index === radioIdx}
              onChange={() => handleRadioChange(radioIdx)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;