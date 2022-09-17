const isDevelopmentMode = process.env.NODE_ENV === "development";

export const Paths = {
  baseUrl: (...paths: string[]) => {
    const joinedPaths = paths.join("/");

    return isDevelopmentMode ? `http://localhost:7000/${joinedPaths}` : `${process.env.BASE_URL}/${joinedPaths}`;
  },
};
