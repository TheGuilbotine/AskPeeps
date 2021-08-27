import React
 from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './HomePage.css'

export default function HomePage() {

    return (
        <div className="home-page__container">
            <div className="home-page__info-container">
                <div className="home-page__info">
                    <h1 className="home-page__text-header">AskPeeps</h1>
                    <ul>
                        <li>Welcome to a growing community of curious peeps.</li>
                        <li>A place to unleash your wonder in a safe environment.</li>
                        <li>There are many features coming soon to ensure your enjoyment.</li>
                        <li className="asterisk-home">*</li>
                        <li>Search Questions</li>
                        <li>Flag inappropriate or inaccurate content</li>
                        <li>Yes vote or No vote content</li>
                        <li>Tag questions</li>
                        <li>Chat</li>
                        <li>For now, anonymously ask questions and respond to other members questions.</li>
                        <li>Sometimes it is better to get the opinions of others rather than google</li>
                        <li>Here you will be able to let loose and ask anything that you'd like to know.</li>
                        <li>Please see the bottom of the page for more information about AskPeeps.</li>
                        <li>Happy Asking Peeps!</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
