export const csvFromObjects = (headers: any[], rows: any[]) => {
  const result = headers.reduce(
    (acc: { [x: string]: any }, header: string | number, index: number) => {
      acc[header] = rows[index];
      return acc;
    },
    {}
  );
  return result;
};
