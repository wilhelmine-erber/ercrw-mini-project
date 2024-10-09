import { FaGithub } from "react-icons/fa";
import { FaXingSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

function Footer() {
    return (
        <footer className="footer footer-center bg-base-200 text-base-content rounded p-10 mt-28">
            <nav>
                <div className="grid grid-flow-col gap-4">
                    <a href="https://www.linkedin.com/in/wilhelmine-erber-248491217/">
                        <FaLinkedin className="text-3xl" />
                    </a>
                    <a href="https://www.xing.com/profile/Wilhelmine_Erber/web_profiles?expandNeffi=true">
                        <FaXingSquare className="text-3xl" />
                    </a>
                    <a href="https://github.com/wilhelmine-erber">
                        <FaGithub className="text-3xl" />
                    </a>
                </div>
            </nav>
            <aside>
                <p>Copyright © {new Date().getFullYear()} - All right reserved by Wilhemlnie Erber</p>
            </aside>
        </footer>
    )
}

export default Footer