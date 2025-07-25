import Image from "next/image";

export const revalidate = 21600;

export default function Home() {
  return (
    <>
      <div className="flex flex-col justify-center p-10 gap-2">
        <div className="flex justify-center">
          <Image src="/green_avatar.png" alt="avatar" width={300} height={300} priority />
        </div>
        <div className="text-2xl font-bold">안녕하세요. Next.js 로 만든 블로그입니다.</div>
      </div>
    </>
  );
}
