import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { getGroupConfig } from '../config/groups';

export default function ResultPage() {
  const { groupCode = 'sls', eventCode = 'test' } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const config = getGroupConfig(groupCode);

  // location.state에서 데이터 가져오기
  const name = location.state?.name;
  const count = location.state?.count;
  const checkinCountInfo = location.state?.checkinCountInfo;
  const isCheckin = location.state?.isCheckin;

  // 데이터가 없으면 체크인 페이지로 리다이렉트
  useEffect(() => {
    if (!checkinCountInfo && (!name || !count)) {
      navigate(`/${groupCode}/${eventCode}`);
    }
  }, [name, count, checkinCountInfo, groupCode, eventCode, navigate]);

  if (!checkinCountInfo && (!name || !count)) {
    return null;
  }

  return (
    <div
      className="container"
      style={{
        '--primary-color': config.theme.primaryColor,
        '--secondary-color': config.theme.secondaryColor
      }}
    >
      <div className="success-container">
        {isCheckin && config.features?.showWelcomeImage !== false && (
          <img
            src={config.features?.welcomeImage || '/images/welcome.png'}
            alt="Welcome"
            className="welcome-image"
          />
        )}

        {isCheckin && name && (
          <>
            <h2 className="welcome-message">
              {name}님, 출석 완료!
            </h2>
            {count && (
              <p className="checkin-count-message">
                우리 소모임에 총 <strong>{count}번째</strong> 출석이에요!
              </p>
            )}
          </>
        )}

        {!isCheckin && (
          <h2 className="welcome-message">
            내 출석 현황
          </h2>
        )}

        {checkinCountInfo && (
          <div className="stats-container">
            <div className="stats-section">
              <h3 className="stats-section-title">올해 출석</h3>
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-value">{checkinCountInfo.this_year_count}</div>
                  <div className="stat-label">모든 소모임</div>
                </div>
                <div className="stat-card stat-card-highlight">
                  <div className="stat-value">{checkinCountInfo.this_year_by_organization_count}</div>
                  <div className="stat-label">{config.name}</div>
                </div>
              </div>
            </div>

            <div className="stats-section">
              <h3 className="stats-section-title">누적 출석</h3>
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-value">{checkinCountInfo.all_count}</div>
                  <div className="stat-label">모든 소모임</div>
                </div>
                <div className="stat-card stat-card-highlight">
                  <div className="stat-value">{checkinCountInfo.all_by_organization_count}</div>
                  <div className="stat-label">{config.name}</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {!checkinCountInfo && count && (
          <div className="stats-container">
            <div className="stat-card stat-card-large">
              <div className="stat-value stat-value-large">{count}</div>
              <div className="stat-label">총 출석 횟수</div>
            </div>
          </div>
        )}

        <p className="sub-message">
          {isCheckin ? '다음에도 와주세요!' : '앞으로도 많은 참여 부탁드려요!'}
        </p>

        <button
          className="button"
          onClick={() => navigate(`/${groupCode}/${eventCode}`)}
        >
          처음으로
        </button>
      </div>
    </div>
  );
}
