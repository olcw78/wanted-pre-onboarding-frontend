type NavItem = {
  path: string;
  name: string;
};

export const navItems: Readonly<Array<NavItem>> = [
  {
    path: "/signup",
    name: "회원가입"
  },
  {
    path: "/signin",
    name: "로그인"
  }
];
