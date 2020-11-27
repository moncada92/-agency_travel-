import { Travel } from "../models/Travels.js";
import { Testimonial } from "../models/Testimonials.js";

const homePage = async (req, res) => {

  // Consult 3 travels the model Travel
  const promiseDB = [];
  promiseDB.push(Travel.findAll({ limit: 3 }))
  promiseDB.push(Testimonial.findAll({ limit: 3 }))

  try {
    const results = await Promise.all( promiseDB );

    res.render('home',{
      pagina: 'Home',
      className: 'home',
      travels: results[0],
      result: results[1]
    })

  } catch (error) {
    console.log(error)
  }
}
const aboutPage = (req, res) => {
  res.render('about',{
    pagina: 'about'
  })
}
const travelsPage = async (req, res) => {
  // consultar db
  const travels = await Travel.findAll();

  res.render('travels',{
    pagina: 'next travels',
    travels
  })
}

//mostrar viaje por su slug
const travelPageDetail = async (req, res) => {

  const { slug } = req.params
  
  try {
    const result = await Travel.findOne({ where: { slug }});
    res.render('travelInfo', {
      pagina: 'Travel Information',
      result
    })
  } catch (error) {
    console.log(error)
  }
}

const testimonialsPage = async (req, res) => {

  try {
    const result = await Testimonial.findAll();

    res.render('testimonials',{
      pagina: 'testimonials',
      result
    })
  } catch (error) {
    console.log(error);
  } 

}

export {
  homePage,
  aboutPage,
  travelsPage,
  testimonialsPage,
  travelPageDetail
}