export function hasTimePassed(targetHour: number, targetMinute: number) {
  // Get the current time
  const now = new Date();


  const targetTime = new Date();
  targetTime.setHours(targetHour, targetMinute, 0, 0); 
  // Compare the two times
  return now > targetTime;
}


