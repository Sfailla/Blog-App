type CatchError = (fn: any) => (...args: any[]) => (...args: any[]) => any

export const catchErrors: CatchError = fn =>
  function (...args) {
    return fn(...args).catch((err: string) => {
      console.error(err)
    })
  }
