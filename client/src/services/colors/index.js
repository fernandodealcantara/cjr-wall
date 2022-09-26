export function getBackgroundColorByNucleo(nucleo) {
  switch (nucleo) {
    case 'NAV':
      return 'bg-tijNAV'
    case 'NOE':
      return 'bg-tijNOE'
    case 'NIP':
      return 'bg-tijNIP'
    case 'NDP':
      return 'bg-tijNDP'
    case 'NUT':
    default:
      return 'bg-tijNUT'
  }
}