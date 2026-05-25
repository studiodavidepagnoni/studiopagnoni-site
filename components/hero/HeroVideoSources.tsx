import type { HeroVideoFormat, HeroVideoSources } from "@/lib/media/heroVideos";

type Props = {
  sources: HeroVideoSources;
  order: HeroVideoFormat[];
};

export function HeroVideoSources({ sources, order }: Props) {
  return (
    <>
      {order.map((format) =>
        format === "webm" ? (
          <source key="webm" src={sources.webm} type="video/webm" />
        ) : (
          <source key="mp4" src={sources.mp4} type="video/mp4" />
        ),
      )}
    </>
  );
}
