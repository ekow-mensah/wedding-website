const mailgun = require('mailgun-js');
const Guest = require('../models/guest.model');

const MAILGUN_DOMAIN = process.env.MAILGUN_DOMAIN;
const MAILGUN_API_KEY = process.env.MAILGUN_API_KEY;
const mg = mailgun({ apiKey: MAILGUN_API_KEY, domain: MAILGUN_DOMAIN });

let ApiController = {
  indexAction: (req, res) => {
    const message = {
      status: "success",
      message: "Yes2Mensah API",
      data: {
        timestamp: new Date().toUTCString()
      }
    }

    res.status(200).json(message);
  },

  saveGuest: async (req, res) => {
    let response = "";
    let { ...params } = req.body;

    try {
      await Guest.create(params);
      const message = "Thank you for reserving your place.";

      const data = {
        from: "Yes2Mensah API <yes2mensah@gmail.com>",
        to: "yes2mensah@gmail.com",
        subject: "RSVP Notification",
        text: "Hi Ekow and Yvonne " + params.firstname + " " + params.lastname + " has submitted their RSVP for the wedding in 2022. Kind Regards, Yes2Mensah API."
      }
      await mg.messages().send(data);

      response = { status: "success", message, data: null };
      return res.status(200).json(response);
    } catch (error) {
      console.log(error);
      response = {
        status: "failed",
        message: "Could not submit your RSVP request. Please try again in a few minutes.",
        data: null
      }
      return res.status(500).json(response);
    }
  },
}

module.exports = ApiController;