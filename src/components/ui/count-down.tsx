'use client';

import { useEffect, useState } from 'react';

type CountdownType = {
  target: Date;
};

function format(value: number) {
  if (value > 9) {
    return value;
  }
  return '0' + value;
}

export function CountDown({ target }: CountdownType) {
  const calculateTimeRemaining = () => {
    const now = new Date().getTime();
    const timeRemaining = now - target.getTime();

    if (timeRemaining <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
      (timeRemaining % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    return {
      days,
      hours,
      minutes,
      seconds,
    };
  };

  const [time, setTime] = useState(calculateTimeRemaining());

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTime(calculateTimeRemaining());
    }, 1000);

    return () => clearInterval(timerInterval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col gap-1">
      <p className="text-gray-400 @5xl:text-xl dark:text-gray-900">
        {time.hours > 0
          ? `${format(time.hours)}h`
          : time.minutes > 0
            ? `${format(time.minutes)}m`
            : `${format(time.seconds)}s`}{' '}
        ago
      </p>
    </div>
  );
}
