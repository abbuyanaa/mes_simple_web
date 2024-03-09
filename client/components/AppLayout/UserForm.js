import React, { useCallback, useState } from 'react';

import UserPopup from './UserPopup';

const UserForm = ({ name }) => {
  const [showPopup, setShowPopup] = useState(false);

  const onAvatarMouseEnter = useCallback(() => setShowPopup(true), []);

  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <div
        className="tw-avatar-name"
        role="menu"
        onClick={onAvatarMouseEnter}
        onKeyDown={null}
        tabIndex={0}
      >
        {name}
      </div>
      {showPopup ? <UserPopup userName={name} setShowPopup={setShowPopup} /> : null}
    </div>
  );
};

export default UserForm;
