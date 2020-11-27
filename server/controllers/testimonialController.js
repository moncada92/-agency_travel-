import { Testimonial } from "../models/Testimonials.js";

const saveTestimonials = async (req, res) => {
  //validate form
  const {name, email, message} = req.body;

  const errors = [];

  //trim -> quite white spaces
  if(name.trim() === '') {
    errors.push({msg: 'the field name is empty'});
  }
  if(email.trim() === '') {
    errors.push({msg: 'the field email is empty'});
  }
  if(message.trim() === '') {
    errors.push({msg: 'the field message is empty'});
  }

  if (errors.length > 0) {
    const result = await Testimonial.findAll();

    // view errors form
    res.render('testimonials',{
      pagina: 'Testimonials',
      errors,
      name,
      email,
      message,
      result
    })
  } else {
    //store in to data base
    try {
      await Testimonial.create({
        name,
        email,
        message
      });
      res.redirect('/testimonials')
      
    } catch (error) {
      console.log(error)
    }
  }
}

export {
  saveTestimonials
}
