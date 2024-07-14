

const signupUser = (req, res) => {
    console.log('user signed up');
    res.send("user signedup successfully!! , yay!!");
}

module.exports = {
    signupUser
}