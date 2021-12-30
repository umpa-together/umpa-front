import React from 'react';
import Follow from 'templates/Main/Account/Follow';

export default function FollowScreen({ route }) {
  const { opt } = route.params;

  return <Follow opt={opt} />;
}
