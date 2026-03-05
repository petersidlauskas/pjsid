
import FloatingModel from "./FloatingModel";
import { usePathname } from "next/navigation";

export default function BoltBackground() {
  const pathname = usePathname();

  return (
    <div
      key={pathname} // optional: forces remount on route change if sizing gets stuck
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 2,
        pointerEvents: "none",
      }}
    >
      <FloatingModel url="/models/model.glb" scale={0.32} />
    </div>
  );
}