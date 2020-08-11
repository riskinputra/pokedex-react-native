import POKEMONS_API from "./API_DEFAULT";

const GET_API = (path: string) => {
  const promise = new Promise((resolve, reject) => {
    POKEMONS_API.get(path)
      .then((result) => {
        resolve(result.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
  return promise;
};

const methods = {
  GET_API,
};

export default methods;
