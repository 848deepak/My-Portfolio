"use client";

import { FollowerPointerCard } from "@/components/ui/following-pointer";

export default function FollowingPointerDemo() {
  return (
    <div className="mx-auto w-80">
      <div className="mb-4 text-center text-zinc-400 text-sm">
        Hover over the card below to see the Following Pointer effect
      </div>
      <FollowerPointerCard
        title={
          <TitleComponent
            title={blogContent.author}
            avatar={blogContent.authorAvatar}
          />
        }
      >
        <div className="group relative h-full overflow-hidden rounded-2xl border border-zinc-700 bg-zinc-900 transition duration-200 hover:shadow-xl hover:shadow-zinc-800/50">
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-tl-lg rounded-tr-lg bg-zinc-800">
            <div className="h-full w-full bg-gradient-to-br from-zinc-700 to-zinc-900 flex items-center justify-center">
              <span className="text-zinc-400 text-sm">Demo Image</span>
            </div>
          </div>
          <div className="p-4">
            <h2 className="my-4 text-lg font-bold text-zinc-200">
              {blogContent.title}
            </h2>
            <h2 className="my-4 text-sm font-normal text-zinc-400">
              {blogContent.description}
            </h2>
            <div className="mt-10 flex flex-row items-center justify-between">
              <span className="text-sm text-zinc-500">{blogContent.date}</span>
              <div className="relative z-10 block rounded-xl bg-white px-6 py-2 text-xs font-bold text-black">
                Read More
              </div>
            </div>
          </div>
        </div>
      </FollowerPointerCard>
      <div className="mt-4 text-center text-zinc-500 text-xs">
        Move your mouse over the card to see the interactive cursor
      </div>
    </div>
  );
}

const blogContent = {
  slug: "amazing-tailwindcss-grid-layouts",
  author: "Deepak Pandey",
  date: "29th June, 2024",
  title: "Interactive Portfolio Components",
  description:
    "Exploring modern UI components with Tailwind CSS and React. This demo showcases the Following Pointer effect that tracks mouse movement.",
  image: "/demo/thumbnail.png",
  authorAvatar: "https://via.placeholder.com/40x40/3b82f6/ffffff?text=DP",
};

const TitleComponent = ({
  title,
  avatar,
}: {
  title: string;
  avatar: string;
}) => (
  <div className="flex items-center space-x-2">
    <img
      src={avatar}
      height="20"
      width="20"
      alt="thumbnail"
      className="rounded-full border-2 border-white"
    />
    <p className="text-white">{title}</p>
  </div>
); 