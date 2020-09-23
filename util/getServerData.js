import useSWR from 'swr';

const fetcher = (url) => fetch(url).then(res => res.json());

function getServerData(key){
  const { data, mutate } = useSWR(key, fetcher);
  if (key){
    const name = key.split('/').pop();
    return {
      [name]: data?.[name],
      ['mutate' + name.charAt(0).toUpperCase() + name.slice(1)]: mutate,
    }
  } else {
    return {};
  }
};

export default getServerData;
