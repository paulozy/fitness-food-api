export const validateFilename = (filename: string): boolean => {
  const regex = /^products_\d+\.json\.gz$/;
  return regex.test(filename);
};
