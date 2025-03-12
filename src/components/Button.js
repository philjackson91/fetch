import buttonStyles from "../styles/Button.module.scss";

export const Button = ({text, type="button", onClick, disabled=false}) => {
    return (
        <button 
            className={buttonStyles.Button}
            disabled={disabled}
            onClick={onClick} 
            type={type}
        >
            {text}
        </button>
    )
};
