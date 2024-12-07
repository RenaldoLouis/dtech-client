const imageExtensions = [
  "jpg",
  "png",
  "jpeg",
  "gif",
  "tiff",
  "bmp",
  "ico",
  "svg",
  "jiff",
  "ief",
  "jpe",
];

const checkTextExtension = (text: string, listString: string[]) => {
  let value = false;
  value = listString.some((element) => text.endsWith(`.${element}`));
  return value;
};

export const isImageLink = (link: string | undefined) =>
  link ? checkTextExtension(link, imageExtensions) : true;

export const getFilenameFromURL = (link: string | undefined) =>
  link ? link.split("_").splice(1).join("_") : "";
