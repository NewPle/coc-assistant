export const formatDate = (date: Date, format: string): string => {
  format = format.replace(
    /yyyy/g,
    date.getFullYear().toString().padStart(4, "0")
  );
  format = format.replace(
    /MM/g,
    (date.getMonth() + 1).toString().padStart(2, "0")
  );
  format = format.replace(/dd/g, date.getDate().toString().padStart(2, "0"));
  format = format.replace(/HH/g, date.getHours().toString().padStart(2, "0"));
  format = format.replace(/mm/g, date.getMinutes().toString().padStart(2, "0"));
  format = format.replace(/ss/g, date.getSeconds().toString().padStart(2, "0"));
  format = format.replace(
    /SSS/g,
    date.getMilliseconds().toString().padStart(3, "0")
  );
  return format;
};
