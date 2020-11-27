import { Router } from "express";
import { homePage, aboutPage, travelsPage, testimonialsPage, travelPageDetail } from "../controllers/pageController.js";
import { saveTestimonials } from "../controllers/testimonialController.js";

const route = Router();

route.get('/', homePage);

route.get('/about', aboutPage);

route.get('/travels', travelsPage);
route.get('/travels/:slug', travelPageDetail);

route.get('/testimonials', testimonialsPage);
route.post('/testimonials', saveTestimonials);


export default route;