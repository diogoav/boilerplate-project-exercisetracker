let idUser = 1; // Use let para poder incrementar
let idExercise = 1; // Use let para poder incrementar

const DatabaseUsers = {};
const DatabaseExercises = {};

exports.createUsers = (req, res) => {
    const username = req.body.username;
    if (username) {
        let userObject;
        try {
            // Certifique-se de que USER está definido corretamente
            userObject = { username: username, _id: idUser.toString() };
            DatabaseUsers[idUser] = userObject;
            idUser++;
        } catch (err) {
            return res.json({ error: err.message });
        }
        // Retorna o objeto criado
        return res.json({ username: userObject.username, _id: userObject._id });
    } else {
        return res.json({ error: 'username is required' });
    }
};

exports.getUsers = (req, res) => {
    const id = req.params._id;

    if (id) {
        console.log("_id: " + id);
        const user = DatabaseUsers[id];
        return res.json(user);
    }
    // Converte o objeto Database em um array de usuários
    const users = Object.values(DatabaseUsers);
    return res.json(users);
};

exports.createExercises = (req, res) => {
    const _id = req.params._id;
    const description = req.body.description;
    const duration = parseInt(req.body.duration, 10);
    const date = req.body.date ? new Date(req.body.date) : new Date();

    if (_id) {
        let exerciseObject;
        try {
            // Certifique-se de que USER está definido corretamente
            exerciseObject = { description: description, duration: duration, date: date.toDateString(), _id: _id.toString() };
            DatabaseExercises[idExercise] = exerciseObject;
            idExercise++;
        } catch (err) {
            return res.json({ error: err.message });
        }
        let user = DatabaseUsers[_id];
        user.description = exerciseObject.description;
        user.duration = exerciseObject.duration;
        user.date = exerciseObject.date;
        // Retorna o objeto criado
        return res.json(user);
    } else {
        return res.json({ error: '_id is required' });
    }
};

exports.getUserLog = (req, res) => {
    const id = req.params._id;
    const { from, to, limit } = req.query;
    const count = 0;
    if (id) {
        try {
            const user = DatabaseUsers[id];
            const exercises = Object.values(DatabaseExercises).filter(exercise => exercise._id === id);

            if (from) {
                exercises = exercises.filter(exercise => new Date(exercise.date) >= new Date(from));
            }
            if (to) {
                exercises = exercises.filter(exercise => new Date(exercise.date) <= new Date(to));
            }
            if (limit) {
                exercises = exercises.slice(0, parseInt(limit));
            }
            user.count = exercises.length;
            user.log = exercises;

            return res.json(user);
        } catch (err) {
            return res.json({ error: err.message });
        }
    }

};
