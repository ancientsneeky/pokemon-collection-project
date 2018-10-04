const POKECARD_SEARCH_INDEX_URL = 'https://api.pokemontcg.io/v1/cards';
const EBAY_SEARCH_URL = 'https://svcs.ebay.com/services/search/FindingService/v1';

function getDataFromPokemonApi(searchTerm, callback) {
  const settings = {
    url: POKECARD_SEARCH_INDEX_URL,
    data: {
      name: `${searchTerm}`
    },
    dataType: 'json',
    type: 'GET',
    success: callback
  };
  $.ajax(settings);
}

  function getDataFromEbayApi(searchTerm, callback, page = 1,entriesOnPage = 9 ) {
  const settings = {
    url: EBAY_SEARCH_URL,
    data: {
      "OPERATION-NAME": 'findItemsByKeywords',
      "SERVICE-VERSION": "1.0",
      "GLOBAL-ID": "EBAY-US",
      keywords: `${searchTerm}`,
      "SECURITY-APPNAME": "ChrisMag-pokesear-PRD-48bb65212-9e1a0bc9",
      "RESPONSE-DATA-FORMAT": "json",
      callback: "_cb_findItemsByKeywords",
      'paginationInput.entriesPerPage': entriesOnPage,
      'paginationInput.pageNumber': page
    },    
    dataType: 'jsonp',
    type: 'GET',
    success: callback
  }
  var example = $.ajax(settings);
  console.log(example);
}

function renderPokeResult(result) {
  const cardName = `${result.name}`
  const cardMetaInfo = `data-setID=${result.id} data-image=${result.imageUrl} data-nationalPokeNum=${result.nationalPokedexNumber} data-rarity="${result.rarity}"`
  const htmlDiv = `
    <div class="js-card-result col-3 searchPlaceHolder">
      <input type="image" src="${result.imageUrl}" id="${result.id}" alt="${cardName}" role="button" aria-pressed="false" class="pokeImg" ${cardMetaInfo}">
      <h2 class="cardName">
        <p>${result.name}</p>
      </h2>
    </div>
  `;
  return htmlDiv;
}

function renderEbayResult(result) {
  return `
    <div class="js-card-result col-3 searchPlaceHolder">
      <h2>
      <p class="ebay title">${result.title[0]}</p>
      <p class="ebay Condition">Condition: ${result.condition[0].conditionDisplayName[0]}</p>
      <a href="${result.viewItemURL[0]}" target="_blank" rel="noopener noreferrer" class="ebay-link">
      <img class="ebayImg" src="${result.galleryURL[0]}" alt="Ebay Image of ${result.title[0]}"/>
      </a>
      <p class="ebay Price">$${result.sellingStatus[0].currentPrice[0].__value__} USD</p>
      <p class="ebay Shipping">Shipped from: ${result.location[0]}</p>
      </h2>
    </div>
  `;
}

function makeBackButton(viewOnEbay) {
  $('.js-search-page-button').html(`<input id="backBtn" type="button" value="Back" role="button"/>`);
  $('.js-search-page-button').removeClass('hidden');
  $('.bottom').append(viewOnEbay);
  $('.bottom').removeClass('hidden');
  $('#backBtn').on('click', event => {
    toggleHiddenTCG();
    $('.js-search-page-button').html("");
  });
}

function displayEbaySearchData(data) {
  const unnestedData = data.findItemsByKeywordsResponse[0].searchResult[0].item;
  if (!unnestedData) {
    $('.js-ebay-search-results').html(`<p class="errorReturn">No Results Found</p>`);
  } else {
    const results = unnestedData.map((item, index) => renderEbayResult(item));
    const searchUrl = data.findItemsByKeywordsResponse["0"].itemSearchURL;
    const viewOnEbay = ebayPageButton(searchUrl);
    $('.js-ebay-search-results').html(results);
    makeBackButton(viewOnEbay);
  }
}

function displayPOKECARDSearchData(data) {
	localStorage.setItem("pokeSearch", JSON.stringify(data.cards));
	const cardArray = JSON.parse(localStorage.getItem("pokeSearch"));
	if (cardArray < 1) {
		$('.js-search-results').html(`<p class="errorReturn">No Results Found</p>`);
	} else {
		const results = data.cards.map((item, index) => renderPokeResult(item));
	$('.js-search-results').html(results);
	handleImageClick();
	}
}

function ebayPageButton(searchUrl) {
  return `<a href="${searchUrl}" target="_blank" rel="noopener noreferrer" class="ebay-search-link">View On Ebay</a>`
}

function watchSubmit() {
  $('.js-search-form').submit(event => {
    event.preventDefault();
    getDataFromPokemonApi(getSubmitValue(), displayPOKECARDSearchData);
    $('.js-ebay-search-results').html(" ");
    $('.js-search-page-button').html("");
    toggleHiddenTCG();
  });
}

function getSubmitValue(){
  return $('.js-query').val();
}

function toggleHiddenTCG() {
  const heading = $('.heading');
  heading.html("Results");
  heading.removeClass('hidden');
  $('.js-search-results').removeClass('hidden');
  $('.js-ebay-search-results').toggleClass('hidden');
}

function toggleHiddenEbay() {
  $('.js-search-results').toggleClass('hidden');
  $('.js-ebay-search-results').toggleClass('hidden');
}

function handleImageClick() {
  var $inputArray = []
  $('.pokeImg').on('click', event => {
    // toggleClass('selected');
    let $target = $(event.target);
    $target.toggleClass('selected');
    $inputArray = $('.selected').toArray();
    testArrayLoop($inputArray);
    // $('.js-search-results > *').addClass('hidden');
    // $('.heading').html("Ebay Results");
    // toggleHiddenEbay();
    // getDataFromEbayApi(searchTerm, displayEbaySearchData); 
  });
}

function testArrayLoop(array) {
  for (card of array) {
    console.log(card);
  }
}

$(watchSubmit);
