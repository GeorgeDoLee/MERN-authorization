import User from "../models/User.js";

const userProfile = async (req, res, next) => {
    try {
        let user = await User.findById(req.user._id);

        if(user){
            return res.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                password: user.password,
                avatar: user.avatar
            })
        } else {
            let error = new Error('user not found');
            error.statusCode = 404;
            next(error);
        }
    } catch (error) {
        next(error);
    }
}

const updateProfile = async (req, res, next) => {
    try {
        let user = await User.findById(req.user._id);

        if(!user){
            throw new Error('user not found');
        }

        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if(req.body.password && req.body.password < 8){
            throw new Error('password must be at least 8 characters');
        } else if(req.body.password){
            user.password = req.body.password;
        }

        const updatedUserProfile = await user.save();

        return res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            password: user.password,
            avatar: user.avatar,
            token: await updatedUserProfile.generateJWT()
        })
    } catch (error) {
        next(error);
    }
}

const deleteProfile = async (req, res, next) => {
    try {
        let user = await User.findById(req.user._id);

        if(!user){
            throw new Error('user not found');
        }

        await user.deleteOne();
        return res.status(200).json({ message: 'user deleted successfully' });
    } catch (error) {
        next(error);        
    }
}


export { userProfile, updateProfile, deleteProfile };