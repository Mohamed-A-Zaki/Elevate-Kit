import { ActionIcon, Tooltip } from "@mantine/core";
import { useEffect, useState } from "react";
import { FaCompress, FaExpand } from "react-icons/fa";

export default function FullScreenToggle() {
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  function handleFullScreen() {
    if (document.fullscreenElement) {
      void document.exitFullscreen();
    } else {
      void document.getElementById("root")?.requestFullscreen();
    }
  }

  useEffect(() => {
    const onChange = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  return (
    <Tooltip label="Toggle fullscreen" withArrow openDelay={250}>
      <ActionIcon
        variant="default"
        size="lg"
        onClick={handleFullScreen}
        aria-label="Toggle fullscreen"
      >
        {isFullscreen ? <FaCompress size={20} /> : <FaExpand size={20} />}
      </ActionIcon>
    </Tooltip>
  );
}
