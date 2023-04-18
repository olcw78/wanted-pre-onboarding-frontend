import type { FC } from "react";

const Footer: FC = () => (
  <div className="w-full h-[120px] bg-slate-100 flex flex-row items-center px-20">
    <div className="flex flex-col justify-center gap-x-3">
      <p className="flex flex-row items-center">
        Written by
        <span className="ml-2 inline font-bold text-xl text-amber-500">
          이윤상
        </span>
      </p>

      <p>2023. 04. 17.</p>

      <a
        href={"https://github.com/olcw78/wanted-pre-onboarding-frontend"}
        className="mt-3"
      >
        <p>
          <span className="font-bold text-2xl text-cyan-300 mr-2">
            Github Repo
          </span>
          로 이동
        </p>
      </a>
    </div>
  </div>
);
export default Footer;
