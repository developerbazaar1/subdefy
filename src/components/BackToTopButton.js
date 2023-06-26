import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpLong } from "@fortawesome/free-solid-svg-icons";

function BackToTopButton() {
  

    return (
        <a href="/#" className="back-to-top bounce">
            <FontAwesomeIcon icon={ faArrowUpLong} />
        </a>
    )
}

export default BackToTopButton;


