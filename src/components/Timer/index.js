import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';

export default function Timer({ time, timeStyle }) {
  const nowTime = new Date();
  const startTime = new Date(time);
  const endTime = new Date(
    startTime.getFullYear(),
    startTime.getMonth(),
    startTime.getDate() + 4,
    startTime.getHours(),
    startTime.getMinutes(),
    startTime.getSeconds(),
    startTime.getMilliseconds(),
  );
  const [remainTime, setRemainTime] = useState(endTime.getTime() - nowTime.getTime());
  const [output, setOutput] = useState('');

  useEffect(() => {
    const seconds = Math.floor(remainTime / 1000);
    const minutes = Math.floor(remainTime / 1000 / 60);
    const hour = Math.floor(minutes / 60);
    const day = Math.floor(hour / 24);
    setOutput(
      `${day}일 ${hour - day * 24 < 10 ? '0' : ''}${hour - day * 24}:${
        minutes - hour * 60 < 10 ? '0' : ''
      }${minutes - hour * 60}:${seconds - minutes * 60 < 10 ? '0' : ''}${
        seconds - minutes * 60
      } 남음`,
    );
    const timer = setInterval(() => setRemainTime((prev) => prev - 1000), 1000);
    return () => clearInterval(timer);
  }, [remainTime]);

  return <Text style={timeStyle}>{output}</Text>;
}
