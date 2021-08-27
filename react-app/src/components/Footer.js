import './Footer.css'

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer__container">
                <div className="footer-info__container">
                    <div className="footer-info">
                        <div className="footer-columns__container">
                            <div className="column__container">
                                <div className="column__title">Future of AskPeeps</div>
                                <ul>
                                    <li>Search Questions</li>
                                    <li className="asterisk">*</li>
                                    <li>Flag inappropriate or inaccurate content</li>
                                    <li className="asterisk">*</li>
                                    <li>Yes vote or No vote content</li>
                                    <li className="asterisk">*</li>
                                    <li>Tag questions</li>
                                    <li className="asterisk">*</li>
                                    <li>Chat</li>
                                </ul>
                            </div>
                            <div className="column__container">
                                <div className="column__title">AskPeeps</div>
                                <ul>
                                    <li className="footer-link__container">
                                        <a className='footer__link' href='https://github.com/TheGuilbotine/AskPeeps' target="_blank">
                                        About AskPeeps <i class="fab fa-github-square"></i>
                                        </a>
                                    </li>
                                    <li className="asterisk">*</li>
                                    <li>
                                        <a className='footer__link' href='https://github.com/TheGuilbotine' target="_blank">
                                            About Pierre Guilbault <i className="fab fa-github-square"></i>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div className="column__container">
                                <div className="column__title">Contact me on LinkedIn</div>
                                <ul>
                                    <li>
                                        <a className='footer__link' href='https://www.linkedin.com/in/pierre-guilbault-30020549/' target="_blank">
                                            Pierre Guilbault <i className="fab fa-linkedin"></i>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div className="column__container">
                                <div className="column__title">My Projects</div>
                                <ul>
                                    <li>
                                        <a className='footer__link' href='https://goodcipa.herokuapp.com/' target="_blank">
                                            GoodCIPA
                                        </a>
                                    </li>
                                    <li className="asterisk">*</li>
                                    <li>
                                        <a className='footer__link' href='https://table--talk.herokuapp.com/' target="_blank">
                                            TableTalk
                                        </a>
                                    </li>
                                    <li></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
   )
}
