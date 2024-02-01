export const formatPercentage = (count: number, total: number) => {
  return `${((count / total) * 100).toFixed(0)}%`;
};

// Util function for date formatting
export const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  };
  return new Date(dateString).toLocaleString(undefined, options);
};
