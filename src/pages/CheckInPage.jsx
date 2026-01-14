import { useParams } from 'react-router-dom';
import { getGroupConfig } from '../config/groups';
import CheckInForm from '../components/CheckInForm';

export default function CheckInPage() {
  const { groupCode = 'sls', eventCode = 'test' } = useParams();
  const config = getGroupConfig(groupCode);

  // showWelcomeImage 기본값은 true
  const showWelcomeImage = config.features?.showWelcomeImage !== false;
  const welcomeImage = config.features?.welcomeImage || '/images/welcome.png';

  return (
    <div
      className="container"
      style={{
        '--primary-color': config.theme.primaryColor,
        '--secondary-color': config.theme.secondaryColor
      }}
    >
      <img
        src={config.logo}
        alt={`${config.name} 로고`}
        className="logo"
        style={{
          width: config.theme.logoWidth,
          margin: config.theme.logoMargin
        }}
      />
      <h1 className="title">{config.title}</h1>
      <p className="description">
        {config.description}<br />
        {config.subDescription}
      </p>

      {showWelcomeImage && (
        <img
          src={welcomeImage}
          alt="환영 이미지"
          className="welcome-image"
        />
      )}

      <CheckInForm eventCode={eventCode} groupCode={groupCode} />
    </div>
  );
}

