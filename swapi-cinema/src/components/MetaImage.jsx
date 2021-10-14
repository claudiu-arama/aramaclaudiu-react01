import { useEffect, useState } from 'react';

const baseUrl =
  'https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/ImageSearchAPI';

const apiKey = process.env.REACT_APP_WEB_SEARCH_KEY;
const host = 'contextualwebsearch-websearch-v1.p.rapidapi.com';

export const MetaImage = ({ term }) => {
  const [requesting, setRequesting] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  // 2nd param list of dependencies
  // with empty array - simulate 'componentdidmount' - runs when it is mounted in DOM
  // we will use useeffect to call the api
  useEffect(() => {
    const refinedSearchTerm = encodeURIComponent(`star wars ${term}`);
    const random = Math.floor(Math.random() * 2000) + 1;

    setTimeout(() => {
      fetch(
        `${baseUrl}?q=${refinedSearchTerm}&pageNumber=1&pageSize=1&autoCorrect=true`,
        {
          headers: {
            'x-rapidapi-key': apiKey,
            'x-rapiapi-host': host,
            useQuerryString: true,
          },
        },
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          const imageUrl = data.value[0].url;

          setRequesting(false);
          setImageUrl(imageUrl);
        });
    }, random);
  }, [term]);

  return (
    <>
      {requesting === true ? (
        '...loading'
      ) : (
        <img className="img-fluid" src={imageUrl} alt={term}></img>
      )}
    </>
  );
};

export default MetaImage;
