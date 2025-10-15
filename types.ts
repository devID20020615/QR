
export type DotType = "dots" | "rounded" | "classy" | "classy-rounded" | "square" | "extra-rounded";

export interface QrOptions {
  text: string;
  color: string;
  dotStyle: DotType;
}
