import { useState, useEffect } from "react";

export default function InlineCountdownTimer({
  initialSeconds,
  cb,
  dep = [],
}) {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    if (seconds > 0) {
      const timerId = setTimeout(() => {
        setSeconds(seconds - 1);
      }, 1000);

      return () => {
        clearTimeout(timerId);
      };
    } else {
      cb?.();
    }

  }, [seconds]);

  useEffect(() => {
    setSeconds(initialSeconds);
  }, [initialSeconds, ...dep]);

  return <span>{seconds} 秒</span>;
}
