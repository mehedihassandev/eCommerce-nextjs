export const useStringHelpers = () => {
  const capitalFirstLetter = (text: string) => {
    return text.charAt(0).toUpperCase() + text.substring(1);
  };

  const formatNumber = (num: number) => {
    return num?.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return {
    capitalFirstLetter,
    formatNumber,
  };
};
