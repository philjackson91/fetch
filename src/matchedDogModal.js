import ReactDOM from "react-dom";

import { Button } from "./components";

import cardStyles from "./styles/Card.module.scss";
import matchedDogModalStyles from "./styles/MatchedDogModal.module.scss";


const MatchedDogModal = ({ dog, onClose }) => {
  if (!dog) return null;

  return ReactDOM.createPortal(
    <div className={matchedDogModalStyles.MachtedDogModal} onClick={onClose}>
      <div className={cardStyles.Card} onClick={(e) => e.stopPropagation()}>
        <Button className="close-btn" onClick={onClose} text="x" />
        <h2>Matched Dog!</h2>
        <img src={dog.img} alt={dog.name} className="dog-image" />
        <h3>{dog.name}</h3>
        <p>Breed: {dog.breed}</p>
        <p>Age: {dog.age}</p>
        <p>Zipcode: {dog.zip_code}</p>
      </div>
    </div>,
    document.body
  );
};

export default MatchedDogModal;
