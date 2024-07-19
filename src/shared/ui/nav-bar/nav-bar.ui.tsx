import { NavButton } from "@/shared/ui/nav-button";
import { BsPostcard } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";

export const NavBar = () => {
  return (
    <nav>
      <ul className="flex flex-col gap-5">
        <li>
          <NavButton href="/" icon={<BsPostcard />}>
            Посты
          </NavButton>
        </li>
        <li>
          <NavButton href="following" icon={<FiUsers />}>
            Подписки
          </NavButton>
        </li>
        <li>
          <NavButton href="followers" icon={<FaUsers />}>
            Подписчики
          </NavButton>
        </li>
      </ul>
      k
    </nav>
  );
};
