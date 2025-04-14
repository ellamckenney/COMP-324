// DOM references
const searchInput = document.getElementById('filterInput');
const searchImagesBtn = document.getElementById('searchBtn');
const sortSelect = document.getElementById('sortSelect');
const viewSelect = document.getElementById('viewSelect');

const firstPageBtn = document.getElementById('firstPage');
const prevPageBtn = document.getElementById('prevPage');
const nextPageBtn = document.getElementById('nextPage');
const lastPageBtn = document.getElementById('lastPage');

const imageOutput = document.getElementById('imageOutput');
const summaryOutput = document.getElementById('summary');

let pageNo = 1;
let totalPages = 0;
let photosData = [];
let sort = 'date-posted-desc';
let currentQuery = '';

const key = 'INSERT API KEY';

// building the api url
const buildFlickrURL = (page = 1, text = '', sortOrder = 'date-posted-desc') => {
  return `https://www.flickr.com/services/rest/?method=flickr.photos.search`
    + `&api_key=${key}`
    + `&text=${encodeURIComponent(text)}`
    + `&sort=${sortOrder}`
    + `&format=json&nojsoncallback=1`
    + `&per_page=20&page=${page}`;
};

// building api photo data 
const transformPhotoData = (data) => {
  return {
    id: data.id,
    title: data.title || '(Untitled)',
    secret: data.secret,
    server: data.server,
    size: 'm',
    url: `https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}_m.jpg`,
  };
};

// searching for images on flickr via the api linked above.
const searchFlickr = async (page = 1, sortOrder = 'date-posted-desc') => {
  const query = searchInput.value.trim();
  const url = buildFlickrURL(page, query, sortOrder);

  try {
    const res = await fetch(url);
    const json = await res.json();

    photosData = json.photos.photo.map(transformPhotoData);
    totalPages = json.photos.pages;

    updateView();

    return totalPages;
  } catch (err) {
    console.error('Error fetching data from Flickr.com:', err);
    imageOutput.innerText = 'Failed to fetch data. Please try again!';
  }
};

// display view
const updateView = () => {
  imageOutput.innerHTML = '';
  summaryOutput.innerHTML = '';

  // filtering
  const filterText = searchInput.value.toLowerCase();
  let filtered = photosData.filter(photo =>
    photo.title.toLowerCase().includes(filterText)
  );

  // sorting
  const sortValue = sortSelect.value;
  filtered.sort((a, b) =>
    sortValue === 'title' ? a.title.localeCompare(b.title) : a.id.localeCompare(b.id)
  );

  // displays
  const view = viewSelect.value;
  if (view === 'grid') renderGrid(filtered);
  else if (view === 'list') renderList(filtered);
  else renderCarousel(filtered);

  // page summary
  summaryOutput.innerHTML = `
    <p><strong>Page:</strong> ${pageNo} / ${totalPages}</p>
    <p><strong>Results:</strong> ${filtered.length}</p>
  `;
};

// setting up grid view
const renderGrid = (photos) => {
  const container = document.createElement('div');
  container.className = 'grid';
  photos.forEach(photo => {
    const img = document.createElement('img');
    img.src = photo.url;
    img.alt = photo.title;
    container.appendChild(img);
  });
  imageOutput.appendChild(container);
};

// setting up list view
const renderList = (photos) => {
  const ul = document.createElement('ul');
  photos.forEach(photo => {
    const li = document.createElement('li');
    li.textContent = `${photo.title} (ID: ${photo.id})`;
    ul.appendChild(li);
  });
  imageOutput.appendChild(ul);
};

// initializing app
const main = () => {
  // search
  searchImagesBtn.addEventListener('click', () => {
    pageNo = 1;
    searchFlickr(pageNo, sort).then(p => totalPages = p);
  });

  // event listener for search button
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      pageNo = 1;
      searchFlickr(pageNo, sort).then(p => totalPages = p);
    }
  });

  // pagination
  firstPageBtn.addEventListener('click', () => {
    pageNo = 1;
    sort = 'date-posted-desc';
    searchFlickr(pageNo, sort);
  });

  prevPageBtn.addEventListener('click', () => {
    if (pageNo > 1) {
      pageNo--;
      searchFlickr(pageNo, sort);
    }
  });

  nextPageBtn.addEventListener('click', () => {
    if (pageNo < totalPages) {
      pageNo++;
      searchFlickr(pageNo, sort);
    }
  });

  lastPageBtn.addEventListener('click', () => {
    pageNo = totalPages;
    sort = 'date-posted-asc';
    searchFlickr(pageNo, sort);
  });

  // adding filters and display
  sortSelect.addEventListener('change', updateView);
  viewSelect.addEventListener('change', updateView);
};

// load app
main();