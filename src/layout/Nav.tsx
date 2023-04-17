import { useAuthCtx } from "../state/auth/auth.state";
import { MouseEventHandler } from "react";
import { Link, useNavigate } from "react-router-dom";
import { navItems } from "./navItems";

const NavLogoutItem = () => (
  <li key="logout">
    <Link to="/">
      <p className="text-white text-xl text-bold">로그아웃</p>
    </Link>
  </li>
);

const Nav = () => {
  const authCtx = useAuthCtx();
  const navigate = useNavigate();

  const imgClickHandler: MouseEventHandler<HTMLButtonElement> = (event) => {
    console.log("logo image is clicked!");
    navigate("/");
  };

  return (
    <div className="w-full h-[70px] bg-amber-500">
      <div className="mx-auto container h-full flex flex-row justify-between items-center">
        <button type="button" onClick={imgClickHandler}>
          <img
            src="image/name-logo.png"
            alt="name logo alt"
            width={150}
            height={50}
          />
        </button>

        <ul className="flex flex-row justify-center gap-x-5">
          {navItems.map((navItem) => {
            if (navItem.name === "로그인" && authCtx.hasSignedIn) {
              return <NavLogoutItem />;
            }

            return (
              <li key={navItem.path}>
                <Link to={navItem.path}>
                  <p className="text-white text-xl text-bold">{navItem.name}</p>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Nav;
