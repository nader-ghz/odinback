const db = require('../models'); // Assuming your models are in the '../models' directory

const Reply = db.Reply;

// Controller functions
const createReply = async (req, res) => {
  try {
    // Extract data from the request body
    const { description, userId, commentaireId, nom , image } = req.body;

    // Create a new reply
    const newReply = await Reply.create({
      description,
      userId,
      commentaireId,
      nom,
      image 
    });

    // Send the created reply as a response
    res.status(201).json(newReply);
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getRepliesByCommentaire = async (req, res) => {
  try {
    // Extract commentaireId from the request params
    const { commentaireId } = req.params;

    // Retrieve all replies for a specific commentaireId
    const replies = await Reply.findAll({
      where: { commentaireId },
    });

    // Send the replies as a response
    res.status(200).json(replies);
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Add other controller functions as needed

module.exports = {
  createReply,
  getRepliesByCommentaire,
  // Add other exported functions as needed
};
