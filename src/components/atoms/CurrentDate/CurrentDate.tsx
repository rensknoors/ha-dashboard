import { useEffect, useState } from 'react';

const CurrentDate = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDate(new Date());
    }, 60000); // Update every minute

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const formattedDate = currentDate.toLocaleDateString('nl', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  return (
    <span className="text-mist-muted text-2xl font-medium">
      {formattedDate}
    </span>
  );
};

export { CurrentDate };
