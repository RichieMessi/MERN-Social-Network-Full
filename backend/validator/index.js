const createPostValidator = (req, res, next) => {
    // title
    req.check('title', 'Title is required').notEmpty()
    req.check('title', 'Title must be netween 4 to 150 characters').isLength({
        min: 4,
        max: 150
    })
     // body
     req.check('body', 'body is required').notEmpty()
     req.check('body', 'Body must be between 4 to 150 characters').isLength({
         min: 4,
         max: 1000
     })

    //  check for errors
    const errors = req.validationErrors()
    // if error show the first one as they happen
    if(errors) {
        const firstError = errors.map(error => error.msg)[0]
        return res.status(400).json({error: firstError})
    }

    // procceed to next middleware
    next();
}

const createUserValidator = (req, res, next) => {
    // name
    req.check('name', 'Name is required').notEmpty()

    // email
    req.check('email', 'Email must be between 3 to 32 chaacters')
    .matches(/.+\@.+\..+/)
    .withMessage('Email must contain @')
    .isLength({
        min: 4,
        max: 2000
    })

    // password
    req.check('password', 'Password is required').notEmpty()
    req.check('password').isLength({
        min: 6
    }).withMessage('Password must be minimum 6 characters')
    .matches(/\d/)
    .withMessage('Must contain a number')
    

    //  check for errors
    const errors = req.validationErrors()
    // if error show the first one as they happen
    if(errors) {
        const firstError = errors.map(error => error.msg)[0]
        return res.status(400).json({error: firstError})
    }

    // procceed to next middleware
    next();
}

const userSignInValidator = (req, res, next) => {


    // req.check('email', 'Email must not be Empty').notEmpty()
    // email
    req.check('email', 'Email must be between 3 to 32 chaacters')
    .matches(/.+\@.+\..+/)
    .withMessage('Email must contain @')
    .isLength({
        min: 4,
        max: 2000
    })

    req.check('password', 'Password is required').notEmpty()
    const errors = req.validationErrors()
    if(errors) {
        const firstError = errors.map(error => error.msg)[0]
        return res.status(400).json({error: firstError})
    }

    next()

}

module.exports = {
    createPostValidator,
    createUserValidator,
    userSignInValidator
}