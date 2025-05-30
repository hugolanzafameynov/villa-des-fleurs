import React, {useState} from 'react';
import {Button, Grid, Link, Typography} from "@mui/material";
import PropTypes from "prop-types";
import {useNavigate} from "react-router-dom"
import {useLanguage} from "../../contexts/LanguageProvider";
import {resetPassword, signInUser} from '../../services/api/firebase/auth';
import {LOGIN_FORM_TYPES, LOGIN_FORM_ERRORS} from '../../constants/login'
import '../../styles/loginStyle.scss';
import LoginInput from "./LoginInput";

/**
 * Component for the authentification/password recovery form in the login page.
 *
 * @returns {JSX.Element} The `LoginForm` component.
 */
const LoginForm = () => {
    const [form, setForm] = useState(LOGIN_FORM_TYPES.LOGIN);
    const [email, setEmail] = useState({value: '', helper: '', error: false});
    const [password, setPassword] = useState({value: '', helper: '', error: false});
    const {translate} = useLanguage();
    const navigate = useNavigate();

    /**
     * Handles the click event on the link at the bottom of the page to switch forms.
     *
     * @param {string} targetForm - The target form to display ('forgot' or 'default').
     */
    const handleChangeFormClick = (targetForm) => {
        setForm(targetForm);
        setEmail({...email, helper: '', error: false})
        setPassword({value: "", helper: '', error: false})
    };
    handleChangeFormClick.propTypes = {
        targetForm: PropTypes.oneOf(Object.values(LOGIN_FORM_TYPES)).isRequired,
    };

    /**
     * Handles the change event of the form field.
     *
     * @param {Object} e - The change event.
     */
    const handleChange = (e) => {
        switch (e.target.name) {
            case 'email':
                setEmail({...email, value: e.target.value});
                break;
            case 'password':
                setPassword({...password, value: e.target.value});
                break;
            default:
                break;
        }
    };

    /**
     * Handles the submission of the authentification/password recovery form.
     *
     * @param {Object} e - The form submission event.
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        setEmail({...email, helper: '', error: false})
        setPassword({...password, helper: '', error: false})

        switch (form) {
            case LOGIN_FORM_TYPES.LOGIN:
                signInUser(email.value, password.value)
                    .then(() => {
                        navigate('/');
                    })
                    .catch(error => {
                        handleFormErrors(error, form);
                    });
                break;
            case LOGIN_FORM_TYPES.FORGOT:
                resetPassword(email.value)
                    .then(() => {
                        setEmail({...email, helper: translate({section: "LOGIN_FORM", key: "FORGOT_FORM_SUCCESS"})})
                    })
                    .catch(error => {
                        handleFormErrors(error, form);
                    });
                break;
            default:
                break;
        }
    };

    /**
     * Handles form errors and displays error messages based on the form type.
     *
     * @param {Object} error - The error object.
     * @param {string} formType - The type of the form ('LOGIN' or 'FORGOT').
     */
    const handleFormErrors = (error, formType) => {
        const errorKey = Object.keys(LOGIN_FORM_ERRORS).find((key) => LOGIN_FORM_ERRORS[key] === error.message.match(/\(([^)]+)\)/)[1]) ?? "DEFAULT";
        const errorFormTypes = {
            [LOGIN_FORM_TYPES.LOGIN]: "LOGIN_FORM_ERROR_",
            [LOGIN_FORM_TYPES.FORGOT]: "FORGOT_FORM_ERROR_",
        };
        const errorKeyPrefix = errorFormTypes[formType];
        const errorMessage = translate({section: "LOGIN_PAGE", key: errorKeyPrefix + errorKey});

        let isEmailError = false;
        let isPasswordError = false;

        switch (LOGIN_FORM_ERRORS[errorKey]) {
            case LOGIN_FORM_ERRORS.INVALID_EMAIL:
            case LOGIN_FORM_ERRORS.MISSING_EMAIL:
            case LOGIN_FORM_ERRORS.USER_DISABLED:
                isEmailError = true;
                break;
            case LOGIN_FORM_ERRORS.MISSING_PASSWORD:
            case LOGIN_FORM_ERRORS.WEAK_PASSWORD:
                isPasswordError = true;
                break
            case LOGIN_FORM_ERRORS.WRONG_PASSWORD:
            case LOGIN_FORM_ERRORS.USER_NOT_FOUND:
            case LOGIN_FORM_ERRORS.TOO_MANY_REQUEST:
            case LOGIN_FORM_ERRORS.NETWORK_REQUEST_FAILED:
            default:
                isEmailError = true;
                isPasswordError = true;
                break;
        }

        if (isEmailError) {
            if (LOGIN_FORM_ERRORS[errorKey] === LOGIN_FORM_ERRORS.USER_NOT_FOUND && formType === LOGIN_FORM_TYPES.FORGOT) {
                //Special case for security
                setEmail(prevEmail => ({
                    ...prevEmail, helper: errorMessage, error: false
                }));
            } else {
                setEmail(prevEmail => ({
                    ...prevEmail, helper: errorMessage, error: true
                }));
            }
        }

        if (isPasswordError) {
            setPassword({
                value: "", helper: errorMessage, error: true
            });
        } else {
            setPassword({
                value: "", helper: "", error: false
            });
        }
    };

    /**
     * Retrieves the form configuration based on the form state.
     *
     * @returns {Object|null} The form configuration or null if the form state is unknown.
     */
    const getFormConfig = () => {
        const commonConfig = {};
        switch (form) {
            case LOGIN_FORM_TYPES.LOGIN:
                return {
                    ...commonConfig,
                    title: translate({section: "LOGIN_PAGE", key: "LOGIN_FORM_TITLE"}),
                    inputs: [{
                        type: 'text',
                        label: translate({section: "LOGIN_PAGE", key: "LOGIN_FORM_LABEL_EMAIL"}),
                        name: 'email',
                        value: email.value,
                        helper: email.helper,
                        error: email.error,
                        isRequired: false,
                    }, {
                        type: 'password',
                        label: translate({section: "LOGIN_PAGE", key: "LOGIN_FORM_LABEL_PASSWORD"}),
                        name: 'password',
                        value: password.value,
                        helper: password.helper,
                        error: password.error,
                        isRequired: false,
                    },],
                    buttonLabel: translate({section: "LOGIN_PAGE", key: "LOGIN_FORM_BUTTON_LOGIN"}),
                    linkTo: LOGIN_FORM_TYPES.FORGOT,
                    linkLabel: translate({section: "LOGIN_PAGE", key: "LOGIN_FORM_BUTTON_TO_FORGOT"}),
                };
            case LOGIN_FORM_TYPES.FORGOT:
                return {
                    ...commonConfig,
                    title: translate({section: "LOGIN_PAGE", key: "FORGOT_FORM_TITLE"}),
                    inputs: [{
                        type: 'text',
                        label: translate({section: "LOGIN_PAGE", key: "FORGOT_FORM_LABEL_EMAIL"}),
                        name: 'email',
                        value: email.value,
                        helper: email.helper,
                        error: email.error,
                        isRequired: false,

                    },],
                    buttonLabel: translate({section: "LOGIN_PAGE", key: "FORGOT_FORM_BUTTON_FORGOT"}),
                    linkTo: LOGIN_FORM_TYPES.LOGIN,
                    linkLabel: translate({section: "LOGIN_PAGE", key: "FORGOT_FORM_BUTTON_TO_LOGIN"}),
                };
            default:
                return null;
        }
    };

    const formConfig = getFormConfig();

    if (formConfig) {
        return (
            <>
                <form onSubmit={handleSubmit} className="login-form">
                    <Typography className="login-form__title">
                        {formConfig.title}
                    </Typography>
                    <Grid container className="login-form__field-container">
                        {formConfig.inputs.map((input, index) => (
                            <LoginInput
                                key={index}
                                onChange={handleChange}
                                type={input.type}
                                label={input.label}
                                name={input.name}
                                value={input.value}
                                helper={input.helper}
                                error={input.error}
                                isRequired={input.isRequired}
                            />
                        ))}
                        <Grid item>
                            <Button type="submit" variant="contained" className="login-form__button">
                                {formConfig.buttonLabel}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
                <Link onClick={() => handleChangeFormClick(formConfig.linkTo)} variant="body2"
                      className="login-form__link">
                    <Typography>{formConfig.linkLabel}</Typography>
                </Link>
            </>
        );
    }
};

export default LoginForm;
