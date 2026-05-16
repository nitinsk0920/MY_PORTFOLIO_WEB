declare module "animejs" {
  type AnimeValue = string | number;

  type AnimeKeyframe = {
    value: AnimeValue;
    duration?: number;
  };

  type AnimeTarget = Element | Element[] | NodeListOf<Element> | string;
  type AnimeDelay =
    | number
    | ((target: Element, index: number, targetsLength: number) => number);

  type AnimeParams = {
    targets: AnimeTarget;
    translateX?: AnimeValue | AnimeValue[] | AnimeKeyframe[];
    translateY?: AnimeValue | AnimeValue[] | AnimeKeyframe[];
    rotate?: AnimeValue | AnimeValue[] | AnimeKeyframe[];
    scaleX?: AnimeValue | AnimeValue[] | AnimeKeyframe[];
    scaleY?: AnimeValue | AnimeValue[] | AnimeKeyframe[];
    scale?: AnimeValue | AnimeValue[] | AnimeKeyframe[];
    opacity?: AnimeValue | AnimeValue[] | AnimeKeyframe[];
    filter?: AnimeValue | AnimeValue[] | AnimeKeyframe[];
    easing?: string;
    direction?: "normal" | "reverse" | "alternate";
    loop?: boolean | number;
    delay?: AnimeDelay;
    duration?: number;
  };

  type AnimeInstance = {
    pause: () => void;
    finished: Promise<void>;
    add: (params: AnimeParams, offset?: AnimeValue) => AnimeInstance;
  };

  type AnimeStatic = {
    (params: AnimeParams): AnimeInstance;
    timeline: (params?: Partial<AnimeParams>) => AnimeInstance;
    remove: (targets: AnimeTarget) => void;
    stagger: (value: number, params?: { start?: number }) => (target: Element, index: number) => number;
  };

  const anime: AnimeStatic;

  export default anime;
}
