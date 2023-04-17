import { useAuthCtx } from "../state/auth/auth.state";

const Nav = () => {
  const authCtx = useAuthCtx();

  return (
    <div className="w-full h-[70px] bg-amber-500">
      <div className="mx-auto container h-full flex flex-row justify-between items-center">
        <img
          src="image/name-logo.png"
          alt="name logo alt"
          width={150}
          height={50}
        />
        <div className="flex flex-row justify-center">
          <p className="text-white text-2xl text-bold">
            {authCtx.hasSignedIn ? "로그아웃" : "로그인"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Nav;
