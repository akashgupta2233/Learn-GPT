import { body, validationResult } from "express-validator";
export const validate = (validations) => {
    return async (req, res, next) => {
        for (let validation of validations) {
            const result = await validation.run(req);
            if (result.errors.length > 0) {
                break;
            }
        }
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }
        return res.status(422).json({ errors: errors.array() });
    };
};
export const userLoginValidator = [
    body("email").notEmpty().isEmail().withMessage("email is incorrect"),
    body("password").isLength({ min: 6, max: 25 })
        .withMessage("minimum length of password should be between 5-25 characters"),
];
export const userSignupValidator = [
    ...userLoginValidator,
    body("name").notEmpty().withMessage("Name is empty"),
];
//# sourceMappingURL=data-validators.js.map