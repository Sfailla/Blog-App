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

const hexColorArray: string[] = [
  '#FF00FF',
  '#F5511E',
  '#7A1FA2',
  '#004C3F',
  '#0288D1',
  '#465A65',
  '#00887A',
  '#33691E'
]

export const getRandomHexColor = (): string => {
  const randomIndex: number = Math.floor(Math.random() * hexColorArray.length)
  return hexColorArray[randomIndex]
}
