import React from 'react';
import {Typography} from "@mui/material";
import {useNavigate} from 'react-router-dom';
import {signOutUser} from "../../services/api/firebase/auth";
import {useLanguage} from '../../contexts/LanguageProvider';
import {PATHS} from '../../constants/routing';
import CustomBreadcrumb from "../custom/CustomBreadcrumb";

/**
 * Component for the account page.
 *
 * @returns {JSX.Element} The AccountPage component.
 */
const AccountPage = () => {
    const {currentLanguage, changeLanguage, translate} = useLanguage();
    const navigate = useNavigate();

    const breadcrumbLinks = [
        {label: translate({section: "BREADCRUMB", key: "HOME"}), to: PATHS.HOME},
        {label: translate({section: "BREADCRUMB", key: "ACCOUNT"}), to: PATHS.ACCOUNT},
    ];

    /**
     * Handles the language change event.
     *
     * @param {Object} e - The change event.
     */
    const handleLanguageChange = (e) => {
        const newLanguage = e.target.value;
        changeLanguage(newLanguage);
    };

    /**
     * Handles the logout action.
     */
    const handleLogout = () => {
        signOutUser()
            .then(() => {
                navigate(PATHS.LOGIN);
            })
    };

    return (
        <div>
            <CustomBreadcrumb links={breadcrumbLinks}/>
            <Typography className="page-title">{translate({section:"ACCOUNT_PAGE", key:"TITLE_ACCOUNT"})}</Typography>
            <select value={currentLanguage} onChange={handleLanguageChange}>
                <option value="fr">{translate({section:"ACCOUNT_PAGE", key:"TRAD_FRENCH"})}</option>
                <option value="en">{translate({section:"ACCOUNT_PAGE", key:"TRAD_ENGLISH"})}</option>
            </select>
            <button onClick={handleLogout}>{translate({section:"ACCOUNT_PAGE", key:"BUTTON_LOGOUT"})}</button>
        </div>
    );
};

export default AccountPage;
