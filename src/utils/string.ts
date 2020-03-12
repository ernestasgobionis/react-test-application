const URL_REGEX = new RegExp(
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
);

export const validateUrl = (url: string): boolean => {
  if (!url || url.length === 0) {
    return false;
  }
  return URL_REGEX.test(url);
};
