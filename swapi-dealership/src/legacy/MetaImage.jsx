// this is legacy code - class based
import { useEffect, useState } from 'react';

const baseUrl =
  'https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/ImageSearchAPI';

const apiKey = '0ecb0fc843msh8471ec4f80a823cp17c7a0jsn473936b5742c';
const host = 'contextualwebsearch-websearch-v1.p.rapidapi.com';

export const MetaImage = ({ term }) => {
  const [requesting, setRequesting] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  // 2nd param list of dependencies
  // with empty array - simulate 'componentdidmount' - runs when it is mounted in DOM
  // we will use useeffect to call the api
  useEffect(() => {
    const refinedSearchTerm = encodeURIComponent(`star wars ${term}`);
    const random = Math.floor(Math.random() * 5000) + 1000;

    const timeoutId = setTimeout(() => {
      fetch(
        `${baseUrl}?q=${refinedSearchTerm}&pageNumber=1&pageSize=1&autoCorrect=true`,
        {
          headers: {
            'x-rapidapi-key': apiKey,
            'x-rapiapi-host': host,
            useQueryString: true,
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
    }, 1000);

    // cleanup code => componentdidunmount type of cleanup
    // each effect needs to have its own cleanup
    return () => {
      clearTimeout(timeoutId);
    };
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
