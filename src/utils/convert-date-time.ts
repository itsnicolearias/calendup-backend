import dayjs from 'dayjs'

export const buildGoogleDateTime = (date: string, time: string, timeZone = 'America/Argentina/Buenos_Aires') => {
  const datetime = dayjs(`${date} ${time}`, timeZone)
  return  datetime.format(); // RFC3339 (e.g. "2025-09-01T10:00:00-03:00")

}

export const calculateEndTime = (date: string, startTime: string, duration: number): string => {
  const timeZone = 'America/Argentina/Buenos_Aires'
  const enddate =  dayjs(`${date} ${startTime}`, timeZone)
    .add(duration, 'minutes')
    
   return enddate.format()
}