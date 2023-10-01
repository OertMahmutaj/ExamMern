const Pirate = require('../models/pirate.model');

const validImageUrlRegex = /\.(jpg|jpeg|png|gif|bmp)$/i;

module.exports.index = (request, response) => {
    response.json({
        message: "Hello World"
    });
}

module.exports.createPirate = async (request, response) => {
    const {
        name,
        imageUrl,
        treasureChests,
        catchPhrase,
        crewPosition,
        isCaptain,
        hasPegLeg,
        hasEyePatch,
        hasHookHand,
    } = request.body;

    if (!name || name.length < 2) {
        return response.status(400).json({ error: "Name is required and should have at least 2 characters" });
    }
    if (!validImageUrlRegex.test(imageUrl)) {
        return response.status(400).json({ error: "Invalid image URL format. It should end with .jpg, .jpeg, .png, .gif, or .bmp" });
    }

    if (crewPosition === 'Captain') {
        const existingCaptain = await Pirate.findOne({ crewPosition: 'Captain' });
        if (existingCaptain) {
            return response.status(400).json({ error: "There is already a Captain." });
        }
    }

    Pirate.create({
        name,
        imageUrl,
        treasureChests,
        catchPhrase,
        crewPosition,
        isCaptain,
        hasPegLeg,
        hasEyePatch,
        hasHookHand,
    })
    .then(pirate => response.json(pirate))
    .catch(err => response.status(500).json(err));
}


module.exports.getAllPirates = (request, response) => {
    
    Pirate.find()
        .then(pirates => {
            console.log(pirates); 
            response.json(pirates);
        })
        .catch(err => {
            console.log(err)
            response.json(err)
        })
}

module.exports.getPirate = (request, response) => {
    const pirateId = request.params.id;

    
    Pirate.findOne({ _id: pirateId }) 
        .then(pirate => {
            if (!pirate) {
                return response.status(404).json({ error: "Pirate not found" });
            }
            response.json(pirate);
        })
        .catch(err => response.status(500).json(err));
}

module.exports.updatePirate = (request, response) => {
    const pirateId = request.params.id;
    const { crewPosition } = request.body;

    if (crewPosition === 'Captain') {
        Pirate.findOne({ isCaptain: true })
            .then(existingCaptain => {
                if (existingCaptain) {
                    return response.status(400).json({ error: "There is already a Captain." });
                } else {
                    Pirate.findOneAndUpdate(
                        { _id: pirateId }, 
                        { $set: { crewPosition, isCaptain: true } }, 
                        { new: true }
                    )
                    .then(updatedPirate => {
                        if (!updatedPirate) {
                            return response.status(404).json({ error: "Pirate not found" });
                        }
                        response.json(updatedPirate);
                    })
                    .catch(err => response.status(500).json(err));
                }
            })
            .catch(err => response.status(500).json(err));
    } else {
        Pirate.findOneAndUpdate(
            { _id: pirateId }, 
            request.body, 
            { new: true }
        )
        .then(updatedPirate => {
            if (!updatedPirate) {
                return response.status(404).json({ error: "Pirate not found" });
            }
            response.json(updatedPirate);
        })
        .catch(err => response.status(500).json(err));
    }
}

module.exports.deletePirate = (request, response) => {
    const pirateId = request.params.id;

    Pirate.deleteOne({ _id: pirateId }) 
        .then(deleteConfirmation => {
            if (deleteConfirmation.deletedCount === 0) {
                return response.status(404).json({ error: "Pirate not found" });
            }
            response.json(deleteConfirmation);
        })
        .catch(err => response.status(500).json(err));
}
