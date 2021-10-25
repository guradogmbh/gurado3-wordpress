import { faChevronCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

export default function BackButton() {
  return (
    <div style={{ cursor: 'pointer ', marginBottom: '10px' }}>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <FontAwesomeIcon
          icon={faChevronCircleLeft}
          style={{ position: 'relative', top: '1px' }}
        />{' '}
        Zurück zur Übersicht
      </Link>
    </div>
  );
}
