import React, {useState} from 'react';
import {Box, Grid, Typography} from '@mui/material';
import './loginPage.scss';
import PropTypes from "prop-types";
import image from '../../assets/ezgif-5-0be764f48f.png';
//Components
import LoginFormDefault from "./LoginFormDefault";
import LoginFormForgot from "./LoginFormForgot";
import LoginLog from "./LoginLog";

/**
 * Composant de la page de connexion.
 *
 * @returns {JSX.Element} Le composant LoginPage.
 */
const LoginPage = () => {
    const [form, setForm] = useState('default');
    const [log, setLog] = useState('');

    /**
     * Gère le clic sur le lien en bas de page pour changer de formulaire.
     *
     * @param {string} targetForm - Le formulaire cible à afficher ('forgot' ou 'default').
     */
    const handleChangeFormClick = (targetForm) => {
        switch (targetForm) {
            case 'forgot':
                setForm('forgot');
                break;
            case 'default':
            default:
                setForm('default');
                break;
        }
        setLog('');
    };
    handleChangeFormClick.propTypes = {
        targetForm: PropTypes.oneOf(['forgot', 'default']).isRequired,
    };

    return (
        <Grid container className="login-page">
            <Grid item className="login-page__left-side">
                {log !== '' &&
                    <LoginLog log={log}/>
                }
                {form === 'default' ? (
                    <LoginFormDefault handleChangeFormClick={handleChangeFormClick} setLog={setLog}/>
                ) : form === 'forgot' ? (
                    <LoginFormForgot handleChangeFormClick={handleChangeFormClick} setLog={setLog}/>
                ) : null}
            </Grid>
            <Grid item className="login-page__right-side">
                <img src={image} alt="villa-des-fleurs.png"/>
                <Box className="login-comment">
                    <Typography variant="h3">BIENVENUE A LA VILLA DES FLEURS</Typography>
                    <Typography variant="text">Ce site est ldsqj qdskj daz hdh jzhd,ksqhjkdsldsqhd kjd
                        sqdh.</Typography>
                </Box>
            </Grid>
        </Grid>
    );
};

export default LoginPage;