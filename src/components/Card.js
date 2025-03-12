import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as filledStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as emptyStar } from "@fortawesome/free-regular-svg-icons";

import cardStyles from "../styles/Card.module.scss";
import buttonStyles from "../styles/Button.module.scss";

export const Card = ({dog, favorites, toggleFavorite}) => {
    return (
        <div className={cardStyles.Card} key={dog.id}>
            <img className={cardStyles.CardImage} src={dog.img} alt={dog.name} />
            <h3>
                {dog.name}
                <button className={buttonStyles.FavoriteButton} onClick={() => toggleFavorite(dog.id)}>
                    <FontAwesomeIcon icon={favorites?.has(dog.id) ? filledStar : emptyStar} />
                </button>
            </h3>
            <p>Breed: {dog.breed}</p>
            <p>Age: {dog.age}</p>
            <p>Zipcode: {dog.zip_code}</p>
        </div>
    )
}