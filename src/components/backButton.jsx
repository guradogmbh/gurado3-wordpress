import { faChevronCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
export default function BackButton() {
  var { t } = useTranslation();
  return (
    <div style={{ cursor: 'pointer ', marginBottom: '10px' }}>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <FontAwesomeIcon
          icon={faChevronCircleLeft}
          style={{ position: 'relative', top: '1px' }}
        />{' '}
         {t("BACK_TO_OVERVIEW")} 
      </Link>
    </div>
  );
}
