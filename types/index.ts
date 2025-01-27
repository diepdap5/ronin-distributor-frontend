import { SVGProps } from "react";
import { Status } from "./member";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};
type ChipColor = "default" | "primary" | "secondary" | "success" | "warning" | "danger";
export const statusColorMap: Record<Status, ChipColor> = { 
    active: "success", 
    paused: "danger", 
    vacation: "warning", 
};