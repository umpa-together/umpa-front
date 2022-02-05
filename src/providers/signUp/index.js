import React, { createContext, useContext, useState, useEffect } from 'react';
import { Context as AuthContext } from 'context/Auth';
import { Context as UserContext } from 'context/User';
import { navigate } from 'lib/utils/navigation';

const SignUpContext = createContext(null);

export const useSignUp = () => useContext(SignUpContext);

export default function SignUpProvider({ children }) {
  const { signUp } = useContext(AuthContext);
  const { getMyInformation } = useContext(UserContext);
  const [information, setInformation] = useState({
    email: '',
    password: '',
    passwordCheck: '',
    useTerm: false,
    privateTerm: false,
    allTerm: false,
  });

  const [validity, setValidity] = useState({
    email: true,
    password: true,
    passwordCheck: true,
  });

  const onInitialize = (data) => {
    const { email, password } = data;
    setInformation((prev) => ({ ...prev, email, password, passwordCheck: password }));
  };
  const onChangeValue = (type, text) => {
    if (type === 'email') {
      setInformation((prev) => ({ ...prev, email: text }));
    } else if (type === 'password') {
      setInformation((prev) => ({ ...prev, password: text }));
    } else if (type === 'passwordCheck') {
      setInformation((prev) => ({ ...prev, passwordCheck: text }));
    }
  };

  const passwordChecker = () => {
    const check =
      /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{6,14}$/.test(
        information.password,
      );
    return check;
  };

  const onClickComplete = async (social) => {
    if (
      social ||
      (information.allTerm &&
        information.email !== '' &&
        passwordChecker(information.password) &&
        passwordChecker(information.password) &&
        information.password === information.passwordCheck)
    ) {
      await signUp({ email: information.email, password: information.password });
      await getMyInformation();
      navigate('ProfileEdit', { signUp: true });
    }
    validityChecker();
  };

  const validityChecker = () => {
    setValidity((prev) => ({
      ...prev,
      email: information.email !== '',
      password: passwordChecker(information.password),
      passwordCheck:
        passwordChecker(information.password) && information.password === information.passwordCheck,
    }));
  };

  const onClickTerm = (key) => {
    if (key === 'allTerm') {
      if (information.useTerm && information.privateTerm) {
        setInformation((prev) => ({ ...prev, useTerm: false, privateTerm: false }));
      } else {
        setInformation((prev) => ({ ...prev, useTerm: true, privateTerm: true }));
      }
    } else if (key === 'useTerm') {
      setInformation((prev) => ({ ...prev, useTerm: !information.useTerm }));
    } else if (key === 'privateTerm') {
      setInformation((prev) => ({ ...prev, privateTerm: !information.privateTerm }));
    }
  };

  useEffect(() => {
    if (information.useTerm && information.privateTerm) {
      setInformation((prev) => ({ ...prev, allTerm: true }));
    } else {
      setInformation((prev) => ({ ...prev, allTerm: false }));
    }
  }, [information.useTerm, information.privateTerm]);

  const value = {
    information,
    validity,
    onChangeValue,
    onClickComplete,
    onClickTerm,
    validityChecker,
    onInitialize,
  };

  return <SignUpContext.Provider value={value}>{children}</SignUpContext.Provider>;
}
