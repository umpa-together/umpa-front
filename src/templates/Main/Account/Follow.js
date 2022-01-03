import React, { useState, useContext, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { goBack } from 'lib/utils/navigation';
import UserView from 'components/Account/UserView';
import { Context as UserContext } from 'context/User';

export default function Follow({ opt }) {
  const { state } = useContext(UserContext);

  const onClickBack = () => {
    goBack();
  };
  const [users, setUsers] = useState(state.follow);
  useEffect(() => {
    setUsers(state.follow);
  }, [opt]);
  return (
    users && (
      <View style={{ marginTop: 100 }}>
        <Button title="back" onPress={onClickBack} />
        <Text>{opt}</Text>
        {users.map((item) => {
          // eslint-disable-next-line no-underscore-dangle
          return <UserView key={item._id} user={item} />;
        })}
      </View>
    )
  );
}
