export function cleanState(state: string) {
  const normalizedState = state.trim().toLowerCase().replace(/[.,]/g, '');
  const states: { [key: string]: string[] } = {
    // assuming that australia will be queensland
    Queensland: ['Queensland', 'Qld', 'QLD', 'qld', 'australia'],
    Victoria: [
      'Victoria',
      'VIC',
      'Vic',
      'vic',
      'victoria',
      'Victoria,',
      'melbourne'
    ],
    'New South Wales': [
      'New South Wales',
      'NSW',
      'Nsw',
      'nsw',
      'NEW SOUTH WALES',
      'nww'
    ],
    'South Australia': ['South Australia', 'SA', 'Sa', 'sa'],
    'Western Australia': ['Western Australia', 'WA', 'Wa', 'wa'],
    Tasmania: ['Tasmania', 'TAS', 'Tas', 'tasmania'],
    'Australian Capital Territory': [
      'Australian Capital Territory',
      'ACT',
      'Act',
      'act',
      'Australian Capital Territory (ACT)',
      'hobart'
    ],
    'Northern Territory': ['Northern Territory', 'NT', 'Nt', 'nt']

    // Add other states and territories as needed
  };
  for (let key in states) {
    if (
      states[key].some((variant) => variant.toLowerCase() === normalizedState)
    ) {
      return key;
    }
  }

  // TODO: LOG THE STATE THAT WAS NOT FOUND
  return normalizedState + ' (not found)';
}
