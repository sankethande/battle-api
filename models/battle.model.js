module.exports = (mongoose) => {
    const Schema = mongoose.Schema;
    return mongoose.model(
        "Battle",
        new Schema({
            name: { type: String, default: "for testing" },
            year: { type: Number, index: true },
            battle_number: { type: Number, index: true }
        })
    );
};