import './Footer.css'

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer__container">
                <div className="footer-info__container">
                    <div className="footer-info">
                        <div className="footer-columns__container">
                            <div className="column__container">
                                <div className="column__title">AskPeeps</div>
                                <ul>
                                    <li className="footer-link__container">
                                        <a className='footer__link' href='https://github.com/TheGuilbotine/AskPeeps' target="_blank">
                                        About AskPeeps <i className="fab fa-github-square"></i>
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
                                <div className="column__title">Contact me</div>
                                <ul>
                                    <li>
                                        <a className='footer__link' href='https://www.linkedin.com/in/pierre-guilbault-30020549/' target="_blank">
                                            LinkedIn <i className="fab fa-linkedin"></i>
                                        </a>
                                    </li>
                                    <li className="asterisk">*</li>
                                    <li>
                                        <a className='footer__link' href='https://angel.co/u/pierre-guilbault-1' target="_blank">
                                            AngelList <i className="fab fa-angellist"></i>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div className="column__container">
                                <div className="column__title">My Portfolio</div>
                                <ul>
                                    <li>
                                        <a className='footer__link' href='https://theguilbotine.github.io/Portfolio/' target="_blank">
                                            Pierre's Portfolio
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
   )
}
