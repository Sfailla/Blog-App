type CatchError = (fn: any) => (...args: any[]) => (...args: any[]) => any

export const catchErrors: CatchError = fn =>
  function (...args) {
    return fn(...args).catch((err: string) => {
      console.error(err)
    })
  }

interface DateOptions extends Intl.DateTimeFormatOptions {
  weekday?: 'long' | 'short' | undefined
  day: 'numeric' | undefined
  month: 'long' | 'short' | undefined
  year: 'numeric' | undefined
}

export const convertToReadableDate = (date: Date | string): string => {
  const d: Date = new Date(date)
  const options: DateOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }
  return d.toLocaleDateString('en-US', options)
}
