const apiKey ='tZTOo-KObla1cNUbIoZuGewMMCVcTXRbmnBPjNg0YpnV7BwQq7t6M1pV_fmPrmicF0xUQgkWUrO70AW1O0lApjRooaN1w_jaK8b-zuL6hJifdbJaSh_UwUHbOxe-YHYx';

const Yelp = {
  search(term, location, sortBy) {
    return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        }
    }).then(response => {
    	console.log(response.headers.get('Content-Type'));
      return response.json();
    }).then(jsonResponse => {
      if (jsonResponse.businesses) {
        return jsonResponse.businesses.map(business => ({
          id: business.id,
          imageSrc: business.image_url,
          name: business.name,
          address: business.location.address1,
          city: business.location.city,
          state: business.location.state,
          zipCode: business.location.zip_code,
          category: business.categories[0].title,
          rating: business.rating,
          reviewCount: business.review_count
        }));
      }
    });
  }
};

export default Yelp;
