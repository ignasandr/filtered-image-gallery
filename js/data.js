import {tags, imageList} from './data/imagedb.js';
import portfolioGallery from './components/portfolio.js';

portfolioGallery.createNav(tags);
portfolioGallery.createGallery(imageList);