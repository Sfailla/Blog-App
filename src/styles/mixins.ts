export const flex = (
  justify: string = 'center',
  align: string = 'center',
  direction: string = 'row'
): string => `
    display: flex;
    justify-content: ${justify};
    align-items: ${align};
    flex-direction: ${direction};
`
