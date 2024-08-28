import Image from "next/image";

export default function Header() {
  return (
    <header id="page-topbar" className="h-[70px] leading-[70px] pr-10 border-b-[1px] border-[#ced4da]">
      <div className="flex justify-between">
        <div className="navbar-brand-box w-[250px] h-[70px] pt-2 border-r-[1px] border-[#ced4da]">
          <Image
            src='/images/logo.png'
            alt='logo'
            width='64'
            height='64'
            className='max-w-full object-cover mx-auto'
          />
        </div>
      </div>
    </header>
  );
}
